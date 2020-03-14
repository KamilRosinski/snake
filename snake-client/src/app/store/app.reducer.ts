import {Action, createReducer, on} from '@ngrx/store';
import * as AppActions from './app.actions';
import {AppState} from './app.state';
import {GameStatus} from '../snake/shared/game-status';
import {Message} from '../messages/model/message.model';
import {GameControls} from '../snake/control/model/game-controls';

const initialState: AppState = {
    messages: [],
    game: {
        status: GameStatus.NEW,
        controls: {
            board: {
                width: 12,
                height: 8
            },
            snake: {
                speed: 3,
                energy: 25
            }
        }
    }
};

export function appReducer(state: AppState, action: Action): AppState {
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
        on(AppActions.updateGameStatus, (state: AppState, action: { payload: GameStatus }) => {
            return {
                ...state,
                game: {
                    ...state.game,
                    status: action.payload
                }
            };
        }),
        on(AppActions.updateGameControls, (state: AppState, action: { payload: GameControls }) => {
            return {
                ...state,
                game: {
                    ...state.game,
                    controls: action.payload
                }
            };
        })
    )(state, action);
}