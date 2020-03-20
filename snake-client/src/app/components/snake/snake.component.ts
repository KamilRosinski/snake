import * as Hammer from 'hammerjs'

import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {GameStatus} from '../../models/game-status';
import {Direction} from '../../models/direction';
import {interval, Observable, Subscription} from 'rxjs';
import {Coordinates} from '../../models/coordinates';
import {MoveResult} from '../../models/move-result';
import {SnakeStatus} from '../../models/snake-status';
import {SnakeLogic} from '../../models/snake-logic';
import {BoardDimensions} from '../../models/boardDimensions';
import {Store} from '@ngrx/store';
import {GameControls} from '../../models/game-controls';
import {AppState} from '../../store/app.state';
import {selectGameControls, selectGameStatus} from '../../store/app.selectors';
import {addMessage, updateGameStatus} from '../../store/app.actions';

@Component({
    selector: 'app-snake',
    templateUrl: './snake.component.html',
    styleUrls: ['./snake.component.scss']
})
export class SnakeComponent implements OnInit, OnDestroy {

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

    private readonly _subscription: Subscription = new Subscription();

    private _snake: SnakeLogic = null;
    private _gameStatus: GameStatus;
    private _interval: Observable<number>;
    private _intervalSubscription: Subscription;
    private _boardDimensions: BoardDimensions;
    private _snakeSpeed: number;
    private _score: number;
    private _initialSnakeEnergy: number;

    constructor(private readonly _store: Store<AppState>) {
    }

    ngOnInit(): void {
        this._subscription.add(this._store.select(selectGameStatus).subscribe((gameStatus: GameStatus) => {
            this._gameStatus = gameStatus;
            this._gameStatusChanged();
        }));
        this._subscription.add(this._store.select(selectGameControls).subscribe((gameControl: GameControls) => {
            if (gameControl) {
                this._boardDimensions = {
                    numberOfColumns: gameControl.board.width,
                    numberOfRows: gameControl.board.height
                };
                this._snakeSpeed = gameControl.snake.speed;
                this._initialSnakeEnergy = gameControl.snake.energy;
            }
        }));
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    private _gameStatusChanged(): void {
        switch (this._gameStatus) {
            case GameStatus.NEW:
                this._reset();
                break;
            case GameStatus.PAUSED:
                this._pause();
                break;
            case GameStatus.RUNNING:
                this._play();
                break;
            default:
                break;

        }
    }

    private _play(): void {
        if (!this._snake) {
            this._snake = new SnakeLogic(this.boardDimensions, this._initialSnakeEnergy);
        }
        this._interval = interval(1000 / this._snakeSpeed);
        this._intervalSubscription = this._interval.subscribe((value: number) => this.move());
        this._sendMessage('Game started.');
    }

    private _sendMessage(body: string): void {
        this._store.dispatch(addMessage({payload: body}));
    }

    private move(): void {
        const moveResult: MoveResult = this._snake.move();
        switch (moveResult.status) {
            case SnakeStatus.WALL_COLLISION:
                this._updateGameStatus(GameStatus.FINISHED);
                this._intervalSubscription.unsubscribe();
                this._sendMessage(`Game ended: snake crashed into wall at position (${moveResult.oldHead.y}, ${moveResult.oldHead.x}).`);
                break;
            case SnakeStatus.TAIL_COLLISION:
                this._updateGameStatus(GameStatus.FINISHED);
                this._intervalSubscription.unsubscribe();
                this._sendMessage(`Game ended: snake crashed into its tail at position (${moveResult.oldHead.y}, ${moveResult.oldHead.x}).`);
                break;
            case SnakeStatus.STARVATION:
                this._updateGameStatus(GameStatus.FINISHED);
                this._intervalSubscription.unsubscribe();
                this._sendMessage(`Game ended: snake ran out of energy at position (${moveResult.newHead.y}, ${moveResult.newHead.x}).`);
                break;
            default:
                if (moveResult.directionChanged) {
                    this._sendMessage(`Turned ${Direction[moveResult.moveDirection]} at position (${moveResult.oldHead.y}, ${moveResult.oldHead.x}).`);
                }
                if (moveResult.foodEaten) {
                    ++this._score;
                    this._sendMessage(`Food eaten at position (${moveResult.newHead.y}, ${moveResult.newHead.x}), new score: ${this.score}.`)
                }
        }
    }

    private _updateGameStatus(gameStatus: GameStatus): void {
        this._store.dispatch(updateGameStatus({payload: gameStatus}));
    }

    private _pause(): void {
        this._intervalSubscription.unsubscribe();
        this._sendMessage('Game paused.');
    }

    private _reset(): void {
        if (this._intervalSubscription) {
            this._intervalSubscription.unsubscribe();
        }
        this._snake = null;
        this._score = 0;
        this._sendMessage('New game.');
    }

    swipe(event: any): void {
        this._changeDirection(SnakeComponent._DIRECTIONS.get(event.direction));
    }

    @HostListener('document:keydown', ['$event'])
    keydown(event: KeyboardEvent): void {
        this._changeDirection(SnakeComponent._DIRECTIONS.get(event.code));
    }

    private _changeDirection(newDirection: Direction): void {
        if (this._gameStatus === GameStatus.RUNNING) {
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

    get boardDimensions(): BoardDimensions {
        return this._boardDimensions;
    }

    get isSnake(): boolean {
        return !!this._snake;
    }

    get gameFinished(): boolean {
        return this._gameStatus === GameStatus.FINISHED;
    }

    get score(): number {
        return this._score;
    }

    get snakeEnergy(): number {
        return this._snake.energy;
    }

    get initialSnakeEnergy(): number {
        return this._initialSnakeEnergy;
    }

}
