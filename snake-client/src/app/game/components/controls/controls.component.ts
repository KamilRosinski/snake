import {Component, OnInit} from '@angular/core';
import {GameStatus} from '../../models/game.model';
import {Store} from '@ngrx/store';
import {GameState} from '../../store/game.state';
import {Observable} from 'rxjs';
import {selectStatus} from '../../store/game.selectors';
import {map} from 'rxjs/operators';
import {updateStatus} from '../../store/game.actions';

@Component({
    selector: 'app-controls',
    templateUrl: './controls.component.html',
    styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {

    isPlayable$: Observable<boolean>;
    isPausable$: Observable<boolean>;
    isResettable$: Observable<boolean>;

    constructor(private readonly store: Store<GameState>) {
    }

    ngOnInit(): void {
        const gameStatus$: Observable<GameStatus> = this.store.select(selectStatus);
        this.isPlayable$ = gameStatus$.pipe(map((status: GameStatus) => (status === GameStatus.NEW || status === GameStatus.PAUSED)));
        this.isPausable$ = gameStatus$.pipe(map((status: GameStatus) => status === GameStatus.RUNNING));
        this.isResettable$ = gameStatus$.pipe(map((status: GameStatus) => status !== GameStatus.NEW));
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

    private updateGameStatus(status: GameStatus): void {
        this.store.dispatch(updateStatus({status}));
    }

}
