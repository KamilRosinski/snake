import {SnakeStatus} from "./snake-status";
import {Coordinates} from "./coordinates";
import {Direction} from "./direction";

export interface MoveResult {

    newPosition: Coordinates;
    oldPosition: Coordinates;
    status: SnakeStatus;
    foodEaten: boolean;
    directionChanged: boolean;
    lastMoveDirection: Direction;

}