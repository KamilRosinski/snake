import {createAction, props} from '@ngrx/store';
import {Evolution} from '../models/evolution.model';

export const loadEvolutions = createAction('[evolution] Load evolutions');

export const evolutionsLoaded = createAction('[evolution] Evolutions loaded', props<{ evolutions: Evolution[] }>());

export const createEvolution = createAction('[evolution] Create evolution');

export const evolutionCreated = createAction('[evolution] Evolution created', props<{evolution: Evolution}>());

export const deleteEvolution = createAction('[evolution] Delete evolution', props<{evolutionId: number}>());

export const evolutionDeleted = createAction('[evolution] Evolution deleted', props<{evolutionId: number}>());
