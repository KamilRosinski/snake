import {createReducer, on} from '@ngrx/store';
import * as AppActions from './app.actions';
import {AppState} from './app.state';
import {GameStatus} from '../snake/shared/game-status';
import {Message} from '../messages/model/message.model';
import {SnakeControlData} from '../snake/control/model/snake-control-data';

const initialState: AppState = {
    messages: [],
    game: {
        status: GameStatus.NEW,
        control: {
            snakeEnergy: 25,
            snakeSpeed: 3,
            boardDimensions: {
                numberOfRows: 8,
                numberOfColumns: 12
            }
        }
    }
};

export const appReducer = createReducer(
    initialState,
    on(AppActions.sendMessageWithTimestamp, (state: AppState, action: { payload: Message }) => {
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
    on(AppActions.updateGameControl, (state: AppState, action: { payload: SnakeControlData }) => {
        return {
            ...state,
            game: {
                ...state.game,
                control: action.payload
            }
        };
    })
);
