import {GameStatus} from '../snake/shared/game-status';
import {GameControls} from '../snake/control/model/game-controls';
import {Message} from '../messages/model/message.model';
import {EntityState} from '@ngrx/entity';
import {Evolution} from '../shared/evolution';

export interface AppState {
    messages: Message[],
    evolutions: EvolutionsState,
    game: GameState
}

export interface GameState {
    status: GameStatus,
    controls: GameControls
}

export interface EvolutionsState extends EntityState<Evolution> {
}
