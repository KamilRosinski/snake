import {AppState} from '../state/app.state';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {messagesAdapter} from '../reducers/snake-reducer';

export const selectAppState = createFeatureSelector<AppState>('app');

export const selectAllMessages = createSelector(selectAppState, (state: AppState) =>
    messagesAdapter.getSelectors().selectAll(state.messages));

export const selectGameStatus = createSelector(selectAppState, (state: AppState) => state.game.status);

export const selectGameControl = createSelector(selectAppState, (state: AppState) => state.game.control);
