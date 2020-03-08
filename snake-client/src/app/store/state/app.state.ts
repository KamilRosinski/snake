import {Message} from '../../messages/model/message.model';
import {GameStatus} from '../../snake/shared/game-status';
import {SnakeControlData} from '../../snake/control/model/snake-control-data';

export interface GameState {
    status: GameStatus,
    control: SnakeControlData
}

export interface AppState {
    messages: Message[],
    game: GameState
}
