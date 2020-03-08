import {AppState} from '../state/app.state';
import {Action, createReducer, on} from '@ngrx/store';
import {Message} from '../../messages/model/message.model';
import * as SnakeActions from '../actions/snake.actions';
import {GameStatus} from '../../snake/shared/game-status';
import {SnakeControlData} from '../../snake/control/model/snake-control-data';

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

const reducer = createReducer(
    initialState,
    on(SnakeActions.sendMessage, (state: AppState, action: { payload: Message }) => {
        return {
            ...state,
            messages: [...state.messages, action.payload]
        };
    }),
    on(SnakeActions.clearMessages, (state: AppState) => {
        return {
            ...state,
            messages: []
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