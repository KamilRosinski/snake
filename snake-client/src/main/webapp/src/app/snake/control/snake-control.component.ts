import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {GameStatus} from '../shared/game-status';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';
import {updateGameControl, updateGameStatus} from '../../store/actions/snake.actions';
import {selectGameStatus} from '../../store/selectors/snake.selectors';

@Component({
    selector: 'app-snake-control',
    templateUrl: './snake-control.component.html',
    styleUrls: ['./snake-control.component.scss']
})
export class SnakeControlComponent implements OnInit, OnDestroy {

    private static readonly POSITIVE_INT_VALIDATORS: Validators[] = [Validators.required, Validators.pattern('^[1-9][0-9]*$')];

    private readonly _subscription: Subscription = new Subscription();

    private _gameStatus: GameStatus;

    snakeControlForm: FormGroup;

    constructor(private readonly _formBuilder: FormBuilder,
                private readonly _store: Store<AppState>) {
    }

    ngOnInit(): void {
        this.snakeControlForm = this._formBuilder.group({
            board: this._formBuilder.group({
                width: [15, SnakeControlComponent.POSITIVE_INT_VALIDATORS],
                height: [10, SnakeControlComponent.POSITIVE_INT_VALIDATORS]
            }),
            snake: this._formBuilder.group({
                speed: [3, SnakeControlComponent.POSITIVE_INT_VALIDATORS]
            })
        });
        this._updateGameControl(this.snakeControlForm.value);
        this._subscription.add(this._store.select(selectGameStatus).subscribe((gameStatus: GameStatus) => {
            this._gameStatus = gameStatus;
            if (this._gameStatus === GameStatus.NEW) {
                this.snakeControlForm.enable();
            } else {
                this.snakeControlForm.disable();
            }
        }));
        this._subscription.add(this.snakeControlForm.valueChanges.subscribe((value: any) => {
            this._updateGameControl(value);
        }));
    }

    private _updateGameControl(value: any) {
        this._store.dispatch(updateGameControl({
            payload: {
                boardDimensions: {
                    numberOfColumns: value.board.width,
                    numberOfRows: value.board.height
                },
                snakeSpeed: value.snake.speed
            }
        }));
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    get playable(): boolean {
        return this._gameStatus === GameStatus.PAUSED || (this._gameStatus === GameStatus.NEW && this.snakeControlForm.valid);
    }

    get pausable(): boolean {
        return this._gameStatus === GameStatus.RUNNING;
    }

    play(): void {
        this._updateGameStatus(GameStatus.RUNNING);
    }

    pause(): void {
        this._updateGameStatus(GameStatus.PAUSED);
    }

    reset(): void {
        this._updateGameStatus(GameStatus.NEW);
    }

    private _updateGameStatus(gameStatus: GameStatus): void {
        this._store.dispatch(updateGameStatus({payload: gameStatus}));
    }

}
