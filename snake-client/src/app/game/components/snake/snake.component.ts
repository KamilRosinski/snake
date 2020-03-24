import * as Hammer from 'hammerjs'

import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Coordinates, Direction, GameSettings, GameStatus, MoveResult, SnakeStatus} from '../../models/game.model';
import {interval, Subscription} from 'rxjs';
import {Snake} from '../../models/snake';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {GameState} from '../../store/game.state';
import {selectStatus} from '../../store/game.selectors';
import {updateStatus} from '../../store/game.actions';

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
    snake: Snake;
    private intervalSubscription: Subscription;
    settings: GameSettings;
    score: number = 0;

    private readonly subscription: Subscription = new Subscription();

    constructor(private readonly activatedRoute: ActivatedRoute,
                private readonly store: Store<GameState>) {
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe((params: { width: number; height: number; speed: number; energy: number }) => {
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
        this.subscription.add(this.store.select(selectStatus).subscribe((status: GameStatus) => this.updateGameStatus(status)));
    }

    ngOnDestroy(): void {
        if (this.intervalSubscription) {
            this.intervalSubscription.unsubscribe();
        }
        this.subscription.unsubscribe();
    }

    private updateGameStatus(gameStatus: GameStatus): void {
        this.gameStatus = gameStatus;
        switch (this.gameStatus) {
            case GameStatus.RUNNING:
                if (!this.snake) {
                    this.snake = new Snake(this.settings);
                }
                this.intervalSubscription = interval(1e3 / this.settings.snake.speed).subscribe(_ => this.move());
                break;
            case GameStatus.PAUSED:
                this.intervalSubscription.unsubscribe();
                break;
            case GameStatus.NEW:
            case GameStatus.FINISHED:
                this.snake = null;
                if (this.intervalSubscription) {
                    this.intervalSubscription.unsubscribe();
                }
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
                this.store.dispatch(updateStatus({status: GameStatus.FINISHED}));
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
