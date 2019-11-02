import * as Hammer from 'hammerjs'

import {Component, HostListener, OnInit} from '@angular/core';
import {MessagingService} from "../messages/service/messaging.service";
import {GameState} from "./game-state";
import {Direction} from "./direction";
import {interval, Observable, Subscription} from "rxjs";
import {Coordinates} from "./coordinates";
import {MoveResult} from "./move-result";
import {SnakeStatus} from "./snake-status";
import {SnakeLogic} from "./snake-logic";
import {Dimensions} from "./dimensions";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-snake',
    templateUrl: './snake.component.html',
    styleUrls: ['./snake.component.scss']
})
export class SnakeComponent implements OnInit {

    private static readonly _DIRECTIONS: Map<string | number, Direction> = new Map<string | number, Direction>([
        ['ArrowUp', Direction.NORTH],
        ['ArrowRight', Direction.EAST],
        ['ArrowDown', Direction.SOUTH],
        ['ArrowLeft', Direction.WEST],
        [Hammer.DIRECTION_UP, Direction.NORTH],
        [Hammer.DIRECTION_RIGHT, Direction.EAST],
        [Hammer.DIRECTION_DOWN, Direction.SOUTH],
        [Hammer.DIRECTION_LEFT, Direction.WEST]
    ]);

    private _snake: SnakeLogic = null;
    private _gameState: GameState = GameState.NEW;
    private _interval: Observable<number> = interval(500);
    private _intervalSubscription: Subscription;
    private _score: number = 0;
    private _boardDimensions: Dimensions = {
        numberOfRows: 10,
        numberOfColumns: 15
    };

    constructor(private readonly _messagingService: MessagingService) {
    }

    ngOnInit(): void {
    }

    play(): void {
        this._gameState = GameState.RUNNING;
        if (!this._snake) {
            this._snake = new SnakeLogic(this.boardDimensions);
        }
        this._intervalSubscription = this._interval.subscribe(value => this.move());
        this._messagingService.sendMessage('Game started.');
    }

    private move(): void {
        const moveResult: MoveResult = this._snake.move();
        switch (moveResult.status) {
            case SnakeStatus.WALL_COLLISION:
                this._gameState = GameState.FINISHED;
                this._intervalSubscription.unsubscribe();
                this._messagingService.sendMessage(`Game ended: snake crashed into wall at position (${moveResult.oldHead.y}, ${moveResult.oldHead.x}).`);
                break;
            case SnakeStatus.TAIL_COLLISION:
                this._gameState = GameState.FINISHED;
                this._intervalSubscription.unsubscribe();
                this._messagingService.sendMessage(`Game ended: snake crashed into its tail at position (${moveResult.oldHead.y}, ${moveResult.oldHead.x}).`);
                break;
            default:
                if (moveResult.directionChanged) {
                    this._messagingService.sendMessage(`Turned ${Direction[moveResult.moveDirection]} at position (${moveResult.oldHead.y}, ${moveResult.oldHead.x}).`);
                }
                if (moveResult.foodEaten) {
                    ++this._score;
                    this._messagingService.sendMessage(`Food eaten at position (${moveResult.newHead.y}, ${moveResult.newHead.x}), new score: ${this._score}.`)
                }
        }
    }

    isPlayable(): boolean {
        return [GameState.NEW, GameState.PAUSED].includes(this._gameState);
    }

    isNew(): boolean {
        return this._gameState === GameState.NEW;
    }

    isPaused(): boolean {
        return this._gameState === GameState.PAUSED;
    }

    pause(): void {
        this._gameState = GameState.PAUSED;
        this._intervalSubscription.unsubscribe();
        this._messagingService.sendMessage('Game paused.');
    }

    isPausable(): boolean {
        return this._gameState === GameState.RUNNING;
    }

    reset(): void {
        this._gameState = GameState.NEW;
        if (this._intervalSubscription) {
            this._intervalSubscription.unsubscribe();
        }
        this._snake = null;
        this._score = 0;
        this._messagingService.sendMessage('Game reset.');
    }

    swipe(event: any): void {
        this.changeDirection(SnakeComponent._DIRECTIONS.get(event.direction));
    }

    @HostListener('document:keydown', ['$event'])
    keydown(event: KeyboardEvent): void {
        this.changeDirection(SnakeComponent._DIRECTIONS.get(event.code));
    }

    private changeDirection(newDirection: Direction): void {
        if (this._gameState === GameState.RUNNING) {
            this._snake.turn(newDirection);
        }
    }

    get headCoordinates(): Coordinates {
        return this._snake.head;
    }

    get foodCoordinates(): Coordinates {
        return this._snake.food;
    }

    get snakeCoordinates(): Coordinates[] {
        return this._snake.snake;
    }

    get score(): number {
        return this._score;
    }

    get boardDimensions(): Dimensions {
        return this._boardDimensions;
    }

    get isSnake(): boolean {
        return !!this._snake;
    }

    resize(snakeControlForm: NgForm) {
        if (snakeControlForm.valid) {
            this._boardDimensions = snakeControlForm.value;
        }
    }

}
