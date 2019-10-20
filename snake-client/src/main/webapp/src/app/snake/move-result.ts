import {SnakeStatus} from "./snake-status";
import {Coordinates} from "./coordinates";
import {Direction} from "./direction";

export interface MoveResult {

    readonly status: SnakeStatus;
    readonly foodEaten: boolean;
    readonly directionChanged: boolean;
    readonly moveDirection: Direction;

}