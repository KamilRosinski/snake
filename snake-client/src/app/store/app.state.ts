import {GameStatus} from '../snake/shared/game-status';
import {GameControls} from '../snake/control/model/game-controls';
import {Message} from '../messages/model/message.model';

export interface GameState {
    status: GameStatus,
    controls: GameControls
}

export interface AppState {
    messages: Message[],
    game: GameState
}
