import {Action, createReducer, on} from '@ngrx/store';
import {GameState} from './game.state';
import {GameStatus} from '../models/game.model';
import {updateStatus} from './game.actions';

const initialState: GameState = {
    status: GameStatus.NEW
};

export function gameReducers(state: GameState, action: Action): GameState {
    return createReducer(
        initialState,
        on(updateStatus, (state: GameState, action: { status: GameStatus }) => ({
            status: action.status
        }))
    )(state, action);
}
