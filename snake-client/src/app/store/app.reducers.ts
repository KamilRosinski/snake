import {Action, createReducer, on} from '@ngrx/store';
import * as AppActions from './app.actions';
import {AppState} from './app.state';
import {GameStatus} from '../snake/shared/game-status';
import {Message} from '../messages/model/message.model';
import {GameControls} from '../snake/control/model/game-controls';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {Evolution} from '../shared/evolution';

const evolutionEntityAdapter: EntityAdapter<Evolution> = createEntityAdapter<Evolution>();

const initialState: AppState = {
    messages: [],
    evolutions: evolutionEntityAdapter.getInitialState(),
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