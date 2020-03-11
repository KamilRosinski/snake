import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {GameStatus} from '../shared/game-status';
import {Store} from '@ngrx/store';
import {distinctUntilChanged} from 'rxjs/operators';
import {SnakeControlData} from './model/snake-control-data';
import {AppState} from '../../store/app.state';
import {selectGameControl, selectGameStatus} from '../../store/app.selectors';
import {updateGameControl, updateGameStatus} from '../../store/app.actions';

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
                width: [SnakeControlComponent.POSITIVE_INT_VALIDATORS],
                height: [SnakeControlComponent.POSITIVE_INT_VALIDATORS]
            }),
            snake: this._formBuilder.group({
                speed: [SnakeControlComponent.POSITIVE_INT_VALIDATORS],
                energy: [SnakeControlComponent.POSITIVE_INT_VALIDATORS]
            })
        });
        this._subscription.add(this._store.select(selectGameStatus).subscribe((gameStatus: GameStatus) => {
            this._gameStatus = gameStatus;
            if (this._gameStatus === GameStatus.NEW) {
                this.snakeControlForm.enable();
            } else {
                this.snakeControlForm.disable();
            }
        }));
        this._subscription.add(this._store.select(selectGameControl).subscribe((gameControl: SnakeControlData) => {
            this.snakeControlForm.setValue({
                board: {
                    height: gameControl.boardDimensions.numberOfRows,
                    width: gameControl.boardDimensions.numberOfColumns
                },
                snake: {
                    speed: gameControl.snakeSpeed,
                    energy: gameControl.snakeEnergy
                }
            });
        }));
        this._subscription.add(this.snakeControlForm.valueChanges
            // fix for: https://github.com/angular/angular/issues/12540
            .pipe(distinctUntilChanged((v1: any, v2: any) => JSON.stringify(v1) === JSON.stringify(v2)))
            .subscribe((value: any) => {
                if (this.snakeControlForm.valid) {
                    this._store.dispatch(updateGameControl({
                        payload: {
                            boardDimensions: {
                                numberOfColumns: value.board.width,
                                numberOfRows: value.board.height
                            },
                            snakeSpeed: value.snake.speed,
                            snakeEnergy: value.snake.energy
                        }
                    }));
                }
            }));
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    get isPlayable(): boolean {
        return this._gameStatus === GameStatus.PAUSED
            || (this._gameStatus === GameStatus.NEW && this.snakeControlForm.valid);
    }

    play(): void {
        this._updateGameStatus(GameStatus.RUNNING);
    }

    get isPausable(): boolean {
        return this._gameStatus === GameStatus.RUNNING;
    }

    pause(): void {
        this._updateGameStatus(GameStatus.PAUSED);
    }

    get isResettable(): boolean {
        return this._gameStatus !== GameStatus.NEW;
    }

    reset(): void {
        this._updateGameStatus(GameStatus.NEW);
    }

    private _updateGameStatus(gameStatus: GameStatus): void {
        this._store.dispatch(updateGameStatus({payload: gameStatus}));
    }

}
