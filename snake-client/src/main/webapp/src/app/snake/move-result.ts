import {SnakeStatus} from "./snake-status";
import {Coordinates} from "./coordinates";
import {Direction} from "./direction";

export interface MoveResult {

    readonly coordinates: Coordinates;
    readonly status: SnakeStatus;
    readonly foodEaten: boolean;
    readonly directionChanged: boolean;
    readonly lastMoveDirection: Direction;

}