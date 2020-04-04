import {Action, createReducer, on} from '@ngrx/store';
import {GameState} from './game.state';
import {GameStatus} from '../models/game.model';
import {incrementScore, resetScore, updateStatus} from './game.actions';

const initialState: GameState = {
    status: GameStatus.NEW,
    score: 0
};

export function gameReducers(state: GameState, action: Action): GameState {
    return createReducer(
        initialState,
        on(updateStatus, (state: GameState, action: { status: GameStatus }) => ({
            ...state,
            status: action.status
        })),
        on(resetScore, (state: GameState) => ({
            ...state,
            score: initialState.score
        })),
        on(incrementScore, (state: GameState, action: { increment: number }) => ({
            ...state,
            score: state.score + action.increment
        }))
    )(state, action);
}
