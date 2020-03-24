import {createAction, props} from '@ngrx/store';
import {GameStatus} from '../models/game.model';

export const updateStatus = createAction('[game] Update status', props<{ status: GameStatus }>());
