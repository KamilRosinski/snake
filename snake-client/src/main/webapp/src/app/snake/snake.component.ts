import * as Hammer from 'hammerjs'

import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {GameStatus} from './shared/game-status';
import {Direction} from './shared/direction';
import {interval, Observable, Subscription} from 'rxjs';
import {Coordinates} from './shared/coordinates';
import {MoveResult} from './shared/move-result';
import {SnakeStatus} from './shared/snake-status';
import {SnakeLogic} from './shared/snake-logic';
import {Dimensions} from './shared/dimensions';
import {Store} from '@ngrx/store';
import {AppState} from '../store/state/app.state';
import {sendMessage, updateGameStatus} from '../store/actions/snake.actions';
import {Message} from '../messages/message';
import {selectGameControl, selectGameStatus} from '../store/selectors/snake.selectors';
import {SnakeControlData} from './control/model/snake-control-data';

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
    private _boardDimensions: Dimensions;
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
        this._subscription.add(this._store.select(selectGameControl).subscribe((gameControl: SnakeControlData) => {
            if (gameControl) {
                this._snakeSpeed = gameControl.snakeSpeed;
                this._boardDimensions = gameControl.boardDimensions;
                this._initialSnakeEnergy = gameControl.snakeEnergy;
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
        this._store.dispatch(sendMessage({payload: new Message(body)}));
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

    get boardDimensions(): Dimensions {
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
