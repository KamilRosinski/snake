import {GameStatus} from '../models/game.model';

export interface GameState {
    status: GameStatus;
    score: number;
}
