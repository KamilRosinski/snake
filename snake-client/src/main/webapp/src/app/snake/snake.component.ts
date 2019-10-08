import * as Hammer from 'hammerjs'

import {Component, HostListener, OnInit} from '@angular/core';
import {MessagingService} from "../messages/messaging.service";
import {GameState} from "./game-state";
import {Direction} from "./direction";
import {Snake} from "./snake";
import {interval, Observable, Subscription} from "rxjs";
import {Dimensions} from "./dimensions";
import {Coordinates} from "./coordinates";
import {MoveResult} from "./move-result";
import {SnakeStatus} from "./snake-status";

@Component({
    selector: 'app-snake',
    templateUrl: './snake.component.html',
    styleUrls: ['./snake.component.scss']
})
export class SnakeComponent implements OnInit {

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

    private snake: Snake = null;
    private gameState: GameState = GameState.NEW;
    private interval: Observable<number> = interval(500);
    private intervalSubscription: Subscription;

    score: number = 0;

    constructor(private messagingService: MessagingService) {
    }

    ngOnInit(): void {
    }

    play(): void {
        this.gameState = GameState.RUNNING;
        if (!this.snake) {
            this.snake = new Snake({numberOfRows: 10, numberOfColumns: 15});
        }
        this.intervalSubscription = this.interval.subscribe(value => {
            let moveResult: MoveResult = this.snake.move();
            if (moveResult.status !== SnakeStatus.ALIVE) {
                this.gameState = GameState.FINISHED;
                this.intervalSubscription.unsubscribe();
                this.messagingService.sendMessage(`Game ended: snake crashed into wall at position (${moveResult.oldPosition.x}, ${moveResult.oldPosition.y}).`)
            } else {
                if (moveResult.directionChanged) {
                    this.messagingService.sendMessage(`Turn at position (${moveResult.oldPosition.x}, ${moveResult.oldPosition.y}), new direction: ${Direction[moveResult.lastMoveDirection]}.`);
                }
                if (moveResult.foodEaten) {
                    ++this.score;
                    this.messagingService.sendMessage(`Food eaten at position (${moveResult.newPosition.x}, ${moveResult.newPosition.y}), new score: ${this.score}.`);
                }
            }
        });
        this.messagingService.sendMessage('Game started.');
    }

    isPlayable(): boolean {
        return [GameState.NEW, GameState.PAUSED].includes(this.gameState);
    }

    pause(): void {
        this.gameState = GameState.PAUSED;
        this.intervalSubscription.unsubscribe();
        this.messagingService.sendMessage('Game paused.');
    }

    isPausable(): boolean {
        return this.gameState === GameState.RUNNING;
    }

    reset(): void {
        this.gameState = GameState.NEW;
        this.intervalSubscription.unsubscribe();
        this.snake = null;
        this.score = 0;
        this.messagingService.sendMessage('Game reset.');
    }

    isResettable(): boolean {
        return this.gameState !== GameState.NEW;
    }

    swipe(event: any): void {
        this.changeDirection(SnakeComponent.DIRECTIONS.get(event.direction));
    }

    @HostListener('document:keydown', ['$event'])
    keydown(event: KeyboardEvent): void {
        this.changeDirection(SnakeComponent.DIRECTIONS.get(event.code));
    }

    private changeDirection(newDirection: Direction): void {
        if (this.gameState === GameState.RUNNING) {
            this.snake.turn(newDirection);
        }
    }

    get boardDimensions(): string {
        return `-0.5 -0.5 ${this.snake.boardDimensions.numberOfColumns} ${this.snake.boardDimensions.numberOfRows}`;
    }

    get headCoordinates(): Coordinates {
        return this.snake.headCoordinates;
    }

    get foodCoordinates(): Coordinates {
        return this.snake.foodCoordinates;
    }

    get isSnake(): boolean {
        return !!this.snake;
    }

}
