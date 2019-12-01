import {AppState} from '../state/app.state';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export const selectAppState = createFeatureSelector<AppState>('app');

export const selectAllMessages = createSelector(selectAppState, (state: AppState) => state.messages.messages);
