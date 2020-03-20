import {GameStatus} from '../models/game-status';
import {GameControls} from '../models/game-controls';
import {Message} from '../models/message.model';
import {EntityState} from '@ngrx/entity';
import {Evolution} from '../models/evolution.model';

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
