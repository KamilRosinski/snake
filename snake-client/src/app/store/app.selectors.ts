import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from './app.state';
import {evolutionSelectors} from './app.reducers';

export const selectAppState = createFeatureSelector<AppState>('app');

export const selectAllMessages = createSelector(selectAppState, (state: AppState) => state.messages);

export const selectGameStatus = createSelector(selectAppState, (state: AppState) => state.game.status);

export const selectGameControls = createSelector(selectAppState, (state: AppState) => state.game.controls);

export const selectAllEvolutions = createSelector(selectAppState, (state: AppState) => evolutionSelectors.selectAll(state.evolutions));
