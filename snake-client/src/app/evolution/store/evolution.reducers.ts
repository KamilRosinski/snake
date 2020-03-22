import {Action, createReducer, on} from '@ngrx/store';
import * as AppActions from './evolution.actions';
import {EvolutionState} from './evolution.state';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {Evolution} from '../models/evolution.model';

const evolutionEntityAdapter: EntityAdapter<Evolution> = createEntityAdapter<Evolution>();

const initialState: EvolutionState = evolutionEntityAdapter.getInitialState();

export function evolutionReducers(state: EvolutionState, action: Action): EvolutionState {
    return createReducer(
        initialState,
        on(AppActions.evolutionsLoaded, (state: EvolutionState, action: {evolutions: Evolution[]}) =>
            evolutionEntityAdapter.addAll(action.evolutions, state)
        ),
        on(AppActions.evolutionCreated, (state: EvolutionState, action: {evolution: Evolution}) =>
            evolutionEntityAdapter.addOne(action.evolution, state)
        ),
        on(AppActions.evolutionDeleted, (state: EvolutionState, action: {evolutionId: number}) =>
            evolutionEntityAdapter.removeOne(action.evolutionId, state)
        )
    )(state, action);
}

export const {
    selectAll
} = evolutionEntityAdapter.getSelectors();
