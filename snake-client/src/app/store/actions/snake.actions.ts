import {createAction, props} from '@ngrx/store';
import {Message} from '../../messages/model/message.model';
import {GameStatus} from '../../snake/shared/game-status';
import {SnakeControlData} from '../../snake/control/model/snake-control-data';

export const sendMessage = createAction('[messages] Send new message', props<{ payload: string }>());

export const sendMessageWithTimestamp = createAction('[messages] Send new message with timestamp', props<{ payload: Message }>());

export const clearMessages = createAction('[messages] Clear all messages');

export const updateGameStatus = createAction('[game] Update state', props<{ payload: GameStatus }>());

export const updateGameControl = createAction('[game] Update control', props<{ payload: SnakeControlData }>());
