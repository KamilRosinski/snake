import {createAction, props} from '@ngrx/store';
import {GameStatus} from '../snake/shared/game-status';
import {Message} from '../messages/model/message.model';
import {GameControls} from '../snake/control/model/game-controls';

export const addMessage = createAction('[messages] Add new message', props<{ payload: string }>());

export const addMessageWithTimestamp = createAction('[messages] Add new message with timestamp', props<{ payload: Message }>());

export const clearMessages = createAction('[messages] Clear all messages');

export const updateGameStatus = createAction('[game] Update state', props<{ payload: GameStatus }>());

export const updateGameControls = createAction('[game] Update control', props<{ payload: GameControls }>());
