import {Coordinates} from "./coordinates";
import {Direction} from "./direction";
import {Dimensions} from "./dimensions";
import {SnakeModel} from "./snake-model";
import {MoveResult} from "./move-result";
import {SnakeStatus} from "./snake-status";

export class SnakeLogic {

    private static readonly MOVE_VECTORS: Map<Direction, Coordinates> = new Map<Direction, Coordinates>([
        [Direction.NORTH, new Coordinates(0, -1)],
        [Direction.EAST, new Coordinates(1, 0)],
        [Direction.SOUTH, new Coordinates(0, 1)],
        [Direction.WEST, new Coordinates(-1, 0)]
    ]);

    private readonly _model: SnakeModel;

    private _lastMoveDirection: Direction;
    private _nextMoveDirection: Direction;
    private _snake: Coordinates[];

    constructor(private readonly boardDimensions: Dimensions, initialDirection: Direction = Direction.EAST) {
        this._model = new SnakeModel(boardDimensions);
        this._lastMoveDirection = initialDirection;
        this._nextMoveDirection = initialDirection;

        const initialHead: Coordinates = new Coordinates(Math.floor(boardDimensions.numberOfColumns / 2), Math.floor(boardDimensions.numberOfRows / 2));
        this._model.popEmptyField(initialHead);
        this._model.pushSnake(initialHead);

        const initialFood: Coordinates = this._model.popRandomEmptyField();
        this._model.updateFoodField(initialFood);

        this._snake = this._model.snake;
    }

    turn(newDirection: Direction): void {
        if ([90, 270].includes(Math.abs(this._lastMoveDirection - newDirection))) {
            this._nextMoveDirection = newDirection;
        }
    }

    move(): MoveResult {
        const directionChanged = this._lastMoveDirection != this._nextMoveDirection;
        const oldHead: Coordinates = this._model.head;
        const newHead: Coordinates = oldHead.add(SnakeLogic.MOVE_VECTORS.get(this._nextMoveDirection));
        const moveDirection: Direction = this._nextMoveDirection;
        let foodEaten: boolean = false;
        let status: SnakeStatus = SnakeStatus.ALIVE;

        if (newHead.x < 0 || newHead.x >= this.boardDimensions.numberOfColumns || newHead.y < 0 || newHead.y >= this.boardDimensions.numberOfRows) {
            status = SnakeStatus.WALL_COLLISION;
        } else {

            if (this._model.isFood(newHead)) {
                foodEaten = true;
            } else {
                this._model.pushEmptyField(this._model.popSnake());
            }

            if (this._model.isSnake(newHead)) {
                status = SnakeStatus.TAIL_COLLISION;
            } else {
                if (foodEaten) {
                    this._model.updateFoodField(this._model.popRandomEmptyField());
                } else {
                    this._model.popEmptyField(newHead);
                }
                this._model.pushSnake(newHead);
                this._lastMoveDirection = this._nextMoveDirection;
                this._snake = this._model.snake;
            }

        }

        return {
            directionChanged,
            foodEaten,
            moveDirection,
            status,
            oldHead,
            newHead
        };
    }

    get head(): Coordinates {
        return this._snake[0];
    }

    get food(): Coordinates {
        return this._model.food;
    }

    get snake(): Coordinates[] {
        return this._snake;
    }

}