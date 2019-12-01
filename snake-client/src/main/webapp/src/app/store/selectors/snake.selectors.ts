import {AppState} from '../state/app.state';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {messagesAdapter} from '../reducers/snake-reducer';

export const selectAppState = createFeatureSelector<AppState>('app');

export const selectAllMessages = createSelector(selectAppState, (state: AppState) => {
    return messagesAdapter.getSelectors().selectAll(state.messages)
});
