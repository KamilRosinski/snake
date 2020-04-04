import {createAction, props} from '@ngrx/store';
import {GameStatus} from '../models/game.model';

export const updateStatus = createAction('[game] Update status', props<{ status: GameStatus }>());

export const resetScore = createAction('[game] Reset score');

export const incrementScore = createAction('[game] Increment score', props<{ increment: number }>());
