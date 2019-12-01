import {AppState, initializeState} from '../state/app.state';
import {Action, createReducer, on} from '@ngrx/store';
import {Message} from '../../messages/message';
import * as SnakeActions from '../actions/snake.actions';

const initialState: AppState = initializeState();

const reducer = createReducer(
    initialState,
    on(SnakeActions.sendMessage, (state: AppState, action: { payload: Message }) => {
        return {
            ...state,
            messages: {
                ...state.messages,
                messages: [...state.messages.messages, action.payload]
            }
        };
    }),
    on(SnakeActions.clearMessages, ((state: AppState) => {
        return {
            ...state,
            messages: {
                ...state.messages,
                messages: []
            }
        };
    }))
);

export function appReducer(state: AppState | undefined, action: Action) {
    return reducer(state, action);
}