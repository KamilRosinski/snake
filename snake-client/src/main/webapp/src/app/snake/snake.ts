import {Coordinates} from "./coordinates";
import {Direction} from "./direction";
import {MoveResult} from "./move-result";
import {Dimensions} from "./dimensions";
import {SnakeStatus} from "./snake-status";

export class Snake {

    private static readonly MOVE_VECTORS: Map<Direction, Coordinates> = new Map<Direction, Coordinates>([
        [Direction.NORTH, new Coordinates(0, -1)],
        [Direction.EAST, new Coordinates(1, 0)],
        [Direction.SOUTH, new Coordinates(0, 1)],
        [Direction.WEST, new Coordinates(-1, 0)]
    ]);

    private lastMoveDirection: Direction = Direction.EAST;
    private nextMoveDirection: Direction = Direction.EAST;

    public headCoordinates: Coordinates;
    public foodCoordinates: Coordinates = new Coordinates(4, 3);

    constructor(public readonly boardDimensions: Dimensions) {
        this.headCoordinates = new Coordinates(
            Math.floor(boardDimensions.numberOfColumns / 2),
            Math.floor(boardDimensions.numberOfRows / 2));
    }

    turn(newDirection: Direction): void {
        if ([90, 270].includes(Math.abs(newDirection - this.lastMoveDirection))) {
            this.nextMoveDirection = newDirection;
        }
    }

    move(): MoveResult {

        const result: MoveResult = {
            status: SnakeStatus.WALL_COLLISION,
            newPosition: null,
            oldPosition: this.headCoordinates,
            directionChanged: false,
            lastMoveDirection: this.lastMoveDirection,
            foodEaten: false
        };

        const newPosition: Coordinates = Snake.MOVE_VECTORS.get(this.nextMoveDirection).add(this.headCoordinates);
        if (newPosition.x >= 0 && newPosition.x < this.boardDimensions.numberOfColumns && newPosition.y >= 0 && newPosition.y < this.boardDimensions.numberOfRows) {

            result.status = SnakeStatus.ALIVE;
            result.newPosition = this.headCoordinates = newPosition;

            if (this.lastMoveDirection !== this.nextMoveDirection) {
                this.lastMoveDirection = this.nextMoveDirection;
                result.directionChanged = true;
            }

            if (this.headCoordinates.x === this.foodCoordinates.x && this.headCoordinates.y === this.foodCoordinates.y) {
                result.foodEaten = true;
            }
        }

        return result;
    }

}