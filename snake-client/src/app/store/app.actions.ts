import {createAction, props} from '@ngrx/store';
import {GameStatus} from '../models/game-status';
import {Message} from '../models/message.model';
import {GameControls} from '../models/game-controls';
import {Evolution} from '../models/evolution.model';

export const addMessage = createAction('[messages] Add new message', props<{ payload: string }>());

export const addMessageWithTimestamp = createAction('[messages] Add new message with timestamp', props<{ payload: Message }>());

export const clearMessages = createAction('[messages] Clear all messages');

export const updateGameStatus = createAction('[game] Update state', props<{ payload: GameStatus }>());

export const updateGameControls = createAction('[game] Update control', props<{ payload: GameControls }>());

export const loadEvolutions = createAction('[evolution] Load evolutions');

export const evolutionsLoaded = createAction('[evolution] Evolutions loaded', props<{ evolutions: Evolution[] }>());

export const createEvolution = createAction('[evolution] Create evolution');

export const evolutionCreated = createAction('[evolution] Evolution created', props<{evolution: Evolution}>());

export const deleteEvolution = createAction('[evolution] Delete evolution', props<{evolutionId: number}>());

export const evolutionDeleted = createAction('[evolution] Evolution deleted', props<{evolutionId: number}>());
