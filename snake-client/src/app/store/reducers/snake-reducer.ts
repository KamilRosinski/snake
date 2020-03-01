import {AppState} from '../state/app.state';
import {Action, createReducer, on} from '@ngrx/store';
import {Message} from '../../messages/message';
import * as SnakeActions from '../actions/snake.actions';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {GameStatus} from '../../snake/shared/game-status';
import {SnakeControlData} from '../../snake/control/model/snake-control-data';

export const messagesAdapter: EntityAdapter<Message> = createEntityAdapter<Message>({
    sortComparer: (m1: Message, m2: Message) => m2.timestamp.getTime() - m1.timestamp.getTime(),
    selectId: (m: Message) => m.id
});

const initialState: AppState = {
    messages: messagesAdapter.getInitialState(),
    game: {
        status: GameStatus.NEW,
        control: null
    }
};

const reducer = createReducer(
    initialState,
    on(SnakeActions.sendMessage, (state: AppState, action: { payload: Message }) => {
        return {
            ...state,
            messages: messagesAdapter.addOne(action.payload, state.messages)
        };
    }),
    on(SnakeActions.clearMessages, (state: AppState) => {
        return {
            ...state,
            messages: messagesAdapter.removeAll(state.messages)
        };
    }),
    on(SnakeActions.updateGameStatus, (state: AppState, action: { payload: GameStatus }) => {
        return {
            ...state,
            game: {
                ...state.game,
                status: action.payload
            }
        };
    }),
    on(SnakeActions.updateGameControl, (state: AppState, action: { payload: SnakeControlData }) => {
        return {
            ...state,
            game: {
                ...state.game,
                control: action.payload
            }
        };
    })
);

export function appReducer(state: AppState | undefined, action: Action) {
    return reducer(state, action);
}