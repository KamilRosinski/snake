import {Action, createReducer, on} from '@ngrx/store';
import * as AppActions from './app.actions';
import {AppState} from './app.state';
import {Message} from '../models/message.model';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {Evolution} from '../models/evolution.model';

const evolutionEntityAdapter: EntityAdapter<Evolution> = createEntityAdapter<Evolution>();

const initialState: AppState = {
    messages: [],
    evolutions: evolutionEntityAdapter.getInitialState(),
};

export function appReducers(state: AppState, action: Action): AppState {
    return createReducer(
        initialState,
        on(AppActions.addMessageWithTimestamp, (state: AppState, action: { payload: Message }) => {
            return {
                ...state,
                messages: [...state.messages, action.payload]
            };
        }),
        on(AppActions.clearMessages, (state: AppState) => {
            return {
                ...state,
                messages: []
            };
        }),
        on(AppActions.evolutionsLoaded, (state: AppState, action: {evolutions: Evolution[]}) => ({
            ...state,
            evolutions: evolutionEntityAdapter.addAll(action.evolutions, state.evolutions)
        })),
        on(AppActions.evolutionCreated, (state: AppState, action: {evolution: Evolution}) => ({
            ...state,
            evolutions: evolutionEntityAdapter.addOne(action.evolution, state.evolutions)
        })),
        on(AppActions.evolutionDeleted, (state: AppState, action: {evolutionId: number}) => ({
            ...state,
            evolutions: evolutionEntityAdapter.removeOne(action.evolutionId, state.evolutions)
        }))
    )(state, action);
}

export const evolutionSelectors = evolutionEntityAdapter.getSelectors();