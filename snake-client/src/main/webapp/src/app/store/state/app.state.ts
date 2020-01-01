import {Message} from '../../messages/message';
import {EntityState} from '@ngrx/entity';
import {GameStatus} from '../../snake/shared/game-status';
import {SnakeControlData} from '../../snake/control/model/snake-control-data';

export interface MessagesState extends EntityState<Message> {
}

export interface GameState {
    status: GameStatus,
    control: SnakeControlData
}

export interface AppState {
    messages: MessagesState,
    game: GameState
}
