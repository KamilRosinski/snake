import {createFeatureSelector, createSelector} from '@ngrx/store';
import {GameState} from './game.state';

const selectGameState = createFeatureSelector<GameState>('game');

export const selectStatus = createSelector(
    selectGameState,
    (state: GameState) => state.status
);
