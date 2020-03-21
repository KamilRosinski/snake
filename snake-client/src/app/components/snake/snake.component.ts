import * as Hammer from 'hammerjs'

import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {GameStatus} from '../../models/game-status';
import {Direction} from '../../models/direction';
import {interval, Subscription} from 'rxjs';
import {MoveResult} from '../../models/move-result';
import {SnakeStatus} from '../../models/snake-status';
import {Snake} from '../../models/snake';
import {ActivatedRoute} from '@angular/router';
import {Coordinates} from '../../models/coordinates';

export interface GameSettings {
    board: BoardSettings;
    snake: SnakeSettings;
}

export interface BoardSettings {
    width: number;
    height: number;
}

export interface SnakeSettings {
    speed: number;
    initialEnergy: number;
}

@Component({
    selector: 'app-snake',
    templateUrl: './snake.component.html',
    styleUrls: ['./snake.component.scss']
})
export class SnakeComponent implements OnInit, OnDestroy {

    private static readonly DIRECTIONS: Map<string | number, Direction> = new Map<string | number, Direction>([
        ['ArrowUp', Direction.NORTH],
        ['ArrowRight', Direction.EAST],
        ['ArrowDown', Direction.SOUTH],
        ['ArrowLeft', Direction.WEST],
        [Hammer.DIRECTION_UP, Direction.NORTH],
        [Hammer.DIRECTION_RIGHT, Direction.EAST],
        [Hammer.DIRECTION_DOWN, Direction.SOUTH],
        [Hammer.DIRECTION_LEFT, Direction.WEST]
    ]);

    private gameStatus: GameStatus = GameStatus.NEW;
    private snake: Snake;
    private intervalSubscription: Subscription = new Subscription();
    private settings: GameSettings;
    private score: number = 0;

    constructor(private readonly activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe((params: {width: number; height: number; speed: number; energy: number}) => {
            this.settings = {
                board: {
                    width: params.width,
                    height: params.height
                },
                snake: {
                    speed: params.speed,
                    initialEnergy: params.energy
                }
            };
        });
    }

    ngOnDestroy(): void {
        this.intervalSubscription.unsubscribe();
    }

    play(): void {
        this.updateGameStatus(GameStatus.RUNNING);
    }

    pause(): void {
        this.updateGameStatus(GameStatus.PAUSED);
    }

    reset(): void {
        this.updateGameStatus(GameStatus.NEW);
    }

    private updateGameStatus(gameStatus: GameStatus): void {
        this.gameStatus = gameStatus;
        switch (this.gameStatus) {
            case GameStatus.RUNNING:
                if (!this.snake) {
                    this.snake = new Snake(this.settings);
                }
                this.intervalSubscription.add(interval(1e3 / this.settings.snake.speed).subscribe(_ => this.move()));
                break;
            case GameStatus.PAUSED:
                this.intervalSubscription.unsubscribe();
                break;
            case GameStatus.NEW:
            case GameStatus.FINISHED:
                this.snake = null;
                this.intervalSubscription.unsubscribe();
                this.score = 0;
                break;
        }
    }

    private move(): void {
        const moveResult: MoveResult = this.snake.move();
        switch (moveResult.status) {
            case SnakeStatus.WALL_COLLISION:
            case SnakeStatus.TAIL_COLLISION:
            case SnakeStatus.STARVATION:
                this.updateGameStatus(GameStatus.FINISHED);
                break;
            case SnakeStatus.ALIVE:
                if (moveResult.foodEaten) {
                    ++this.score;
                }
                break;
        }
    }

    swipe(event: any): void {
        this.changeDirection(SnakeComponent.DIRECTIONS.get(event.direction));
    }

    @HostListener('document:keydown', ['$event'])
    keydown(event: KeyboardEvent): void {
        this.changeDirection(SnakeComponent.DIRECTIONS.get(event.code));
    }

    private changeDirection(newDirection: Direction): void {
        if (this.gameStatus === GameStatus.RUNNING) {
            this.snake.turn(newDirection);
        }
    }

    get snakeEnergy(): number {
        return this.snake.energy;
    }

    get isSnake(): boolean {
        return !!this.snake;
    }

    get gameFinished(): boolean {
        return this.gameStatus === GameStatus.FINISHED;
    }

    get snakeCoordinates(): Coordinates[] {
        return this.snake.snake;
    }

    get headCoordinates(): Coordinates {
        return this.snake.snake[0];
    }

    get foodCoordinates(): Coordinates {
        return this.snake.model.foodCoordinates;
    }

}
