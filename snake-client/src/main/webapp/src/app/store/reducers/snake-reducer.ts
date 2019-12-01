import {AppState} from '../state/app.state';
import {Action, createReducer, on} from '@ngrx/store';
import {Message} from '../../messages/message';
import * as SnakeActions from '../actions/snake.actions';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';

export const messagesAdapter: EntityAdapter<Message> = createEntityAdapter<Message>({
    sortComparer: (m1: Message, m2: Message) => m1.timestamp.getTime() - m2.timestamp.getTime(),
    selectId: (m: Message) => `${m.body}_${m.timestamp.getTime()}`
});

const initialState: AppState = {
    messages: messagesAdapter.getInitialState()
};

const reducer = createReducer(
    initialState,
    on(SnakeActions.sendMessage, (state: AppState, action: { payload: Message }) => {
        return {
            ...state,
            messages: messagesAdapter.addOne(action.payload, state.messages)
        };
    }),
    on(SnakeActions.clearMessages, ((state: AppState) => {
        return {
            ...state,
            messages: messagesAdapter.removeAll(state.messages)
        };
    }))
);

export function appReducer(state: AppState | undefined, action: Action) {
    return reducer(state, action);
}