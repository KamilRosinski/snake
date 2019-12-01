import * as Hammer from 'hammerjs'

import {Component, HostListener, OnInit} from '@angular/core';
import {GameState} from "./shared/game-state";
import {Direction} from "./shared/direction";
import {BehaviorSubject, interval, Observable, Subscription} from "rxjs";
import {Coordinates} from "./shared/coordinates";
import {MoveResult} from "./shared/move-result";
import {SnakeStatus} from "./shared/snake-status";
import {SnakeLogic} from "./shared/snake-logic";
import {Dimensions} from "./shared/dimensions";
import {SnakeControlData} from "./control/model/snake-control-data";
import {Store} from "@ngrx/store";
import {AppState} from "../store/state/app.state";
import {sendMessage} from "../store/actions/snake.actions";
import {Message} from "../messages/message";

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
    private _gameState: GameState;
    private _gameStateSubject: BehaviorSubject<GameState> = new BehaviorSubject<GameState>(GameState.NEW);
    private _interval: Observable<number>;
    private _intervalSubscription: Subscription;
    private _score: number = 0;
    private _boardDimensions: Dimensions;
    private _snakeSpeed: number;

    constructor(private readonly _store: Store<AppState>) {
    }

    ngOnInit(): void {
        this.gameState = GameState.NEW;
    }

    set gameState(gameState: GameState) {
        this._gameState = gameState;
        this._gameStateSubject.next(gameState);
    }

    play(): void {
        this.gameState = GameState.RUNNING;
        if (!this._snake) {
            this._snake = new SnakeLogic(this.boardDimensions);
        }
        this._interval = interval(1000 / this._snakeSpeed);
        this._intervalSubscription = this._interval.subscribe(value => this.move());
        this.sendMessage('Game started.');
    }

    private sendMessage(body: string): void {
        this._store.dispatch(sendMessage({payload: new Message(body)}));
    }

    private move(): void {
        const moveResult: MoveResult = this._snake.move();
        switch (moveResult.status) {
            case SnakeStatus.WALL_COLLISION:
                this.gameState = GameState.FINISHED;
                this._intervalSubscription.unsubscribe();
                this.sendMessage(`Game ended: snake crashed into wall at position (${moveResult.oldHead.y}, ${moveResult.oldHead.x}).`);
                break;
            case SnakeStatus.TAIL_COLLISION:
                this.gameState = GameState.FINISHED;
                this._intervalSubscription.unsubscribe();
                this.sendMessage(`Game ended: snake crashed into its tail at position (${moveResult.oldHead.y}, ${moveResult.oldHead.x}).`);
                break;
            default:
                if (moveResult.directionChanged) {
                    this.sendMessage(`Turned ${Direction[moveResult.moveDirection]} at position (${moveResult.oldHead.y}, ${moveResult.oldHead.x}).`);
                }
                if (moveResult.foodEaten) {
                    ++this._score;
                    this.sendMessage(`Food eaten at position (${moveResult.newHead.y}, ${moveResult.newHead.x}), new score: ${this._score}.`)
                }
        }
    }

    pause(): void {
        this.gameState = GameState.PAUSED;
        this._intervalSubscription.unsubscribe();
        this.sendMessage('Game paused.');
    }

    reset(): void {
        this.gameState = GameState.NEW;
        if (this._intervalSubscription) {
            this._intervalSubscription.unsubscribe();
        }
        this._snake = null;
        this._score = 0;
        this.sendMessage('Game reset.');
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

    update(data: SnakeControlData): void {
        if (data.valid) {
            this._boardDimensions = data.boardDimensions;
            this._snakeSpeed = data.snakeSpeed;
        }
    }

    get gameStateObservable(): Observable<GameState> {
        return this._gameStateSubject.asObservable();
    }
}
