import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {SnakeControlData} from "./model/snake-control-data";
import {GameState} from "../shared/game-state";

@Component({
    selector: 'app-snake-control',
    templateUrl: './snake-control.component.html',
    styleUrls: ['./snake-control.component.scss']
})
export class SnakeControlComponent implements OnInit, OnDestroy {

    private static readonly POSITIVE_INT_VALIDATORS: Validators[] = [Validators.required, Validators.pattern('^[1-9][0-9]*$')];

    private readonly _subscription: Subscription = new Subscription();

    @Output() valueChangedEvent: EventEmitter<SnakeControlData> = new EventEmitter<SnakeControlData>();
    @Output() playEvent: EventEmitter<void> = new EventEmitter<void>();
    @Output() pauseEvent: EventEmitter<void> = new EventEmitter<void>();
    @Output() resetEvent: EventEmitter<void> = new EventEmitter<void>();
    @Input() gameStateChanged: Observable<GameState>;
    private _gameState: GameState;
    snakeControlForm: FormGroup;

    constructor(private readonly _formBuilder: FormBuilder) {
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

        this.notifyFormValueChanged();

        this._subscription.add(this.snakeControlForm.valueChanges.subscribe(value => this.notifyFormValueChanged()));
        this._subscription.add(this.gameStateChanged.subscribe(gameState => {
            this._gameState = gameState;
            if (this._gameState === GameState.NEW) {
                this.snakeControlForm.enable();
            } else {
                this.snakeControlForm.disable();
            }
        }));
    }

    private notifyFormValueChanged(): void {
        this.valueChangedEvent.emit({
            valid: this.snakeControlForm.valid,
            boardDimensions: {
                numberOfColumns: this.snakeControlForm.value.board.width,
                numberOfRows: this.snakeControlForm.value.board.height
            },
            snakeSpeed: this.snakeControlForm.value.snake.speed
        });
    }

    ngOnDestroy(): void {
      this._subscription.unsubscribe();
    }

    get playable(): boolean {
        return this._gameState === GameState.PAUSED || (this._gameState === GameState.NEW && this.snakeControlForm.valid);
    }

    get pausable(): boolean {
        return this._gameState === GameState.RUNNING;
    }

    play(): void {
        this.playEvent.emit();
    }

    pause(): void {
        this.pauseEvent.emit();
    }

    reset(): void {
        this.resetEvent.emit();
    }

}
