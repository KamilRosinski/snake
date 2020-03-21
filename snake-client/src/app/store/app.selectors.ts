import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from './app.state';
import {evolutionSelectors} from './app.reducers';

export const selectAppState = createFeatureSelector<AppState>('app');

export const selectAllMessages = createSelector(selectAppState, (state: AppState) => state.messages);

export const selectAllEvolutions = createSelector(selectAppState, (state: AppState) => evolutionSelectors.selectAll(state.evolutions));
