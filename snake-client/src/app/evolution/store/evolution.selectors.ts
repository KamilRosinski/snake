import {createFeatureSelector, createSelector} from '@ngrx/store';
import {EvolutionState} from './evolution.state';
import {selectAll} from './evolution.reducers';

const selectEvolutionState = createFeatureSelector<EvolutionState>('evolution');

export const selectAllEvolutions = createSelector(
    selectEvolutionState,
    (state: EvolutionState) => selectAll(state)
);
