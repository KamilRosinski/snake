import {Coordinates} from './coordinates';
import {Direction} from './direction';
import {SnakeModel} from './snake-model';
import {MoveResult} from './move-result';
import {SnakeStatus} from './snake-status';
import {GameSettings} from '../components/snake/snake.component';

export class Snake {

    private static readonly TRANSLATION_VECTORS: Map<Direction, Coordinates> = new Map<Direction, Coordinates>([
        [Direction.NORTH, new Coordinates(0, -1)],
        [Direction.EAST, new Coordinates(1, 0)],
        [Direction.SOUTH, new Coordinates(0, 1)],
        [Direction.WEST, new Coordinates(-1, 0)]
    ]);

    readonly model: SnakeModel;

    private lastMoveDirection: Direction;
    private nextMoveDirection: Direction;
    snake: Coordinates[];
    energy: number;

    constructor(private readonly settings: GameSettings,
                initialDirection: Direction = Direction.EAST) {

        this.model = new SnakeModel(this.settings.board);
        this.energy = this.settings.snake.initialEnergy;
        this.lastMoveDirection = initialDirection;
        this.nextMoveDirection = initialDirection;

        const headCoordinates: Coordinates = new Coordinates(Math.floor(this.settings.board.width / 2), Math.floor(this.settings.board.height / 2));
        this.model.popEmptyField(headCoordinates);
        this.model.pushSnake(headCoordinates);

        const foodCoordinates: Coordinates = this.model.popRandomEmptyField();
        this.model.updateFoodField(foodCoordinates);

        this.snake = this.model.snakeCoordinates;
    }

    turn(newDirection: Direction): void {
        if ([90, 270].includes(Math.abs(this.lastMoveDirection - newDirection))) {
            this.nextMoveDirection = newDirection;
        }
    }

    move(): MoveResult {
        const oldHead: Coordinates = this.model.headCoordinates;
        const newHead: Coordinates = oldHead.add(Snake.TRANSLATION_VECTORS.get(this.nextMoveDirection));
        const moveDirection: Direction = this.nextMoveDirection;
        let foodEaten: boolean = false;
        let status: SnakeStatus = SnakeStatus.ALIVE;

        if (newHead.x < 0 || newHead.x >= this.settings.board.width || newHead.y < 0 || newHead.y >= this.settings.board.height) {
            status = SnakeStatus.WALL_COLLISION;
        } else {
            if (this.model.isFood(newHead)) {
                foodEaten = true;
            } else {
                this.model.pushEmptyField(this.model.popSnake());
            }

            if (this.model.isSnake(newHead)) {
                status = SnakeStatus.TAIL_COLLISION;
            } else {
                if (foodEaten) {
                    this.model.updateFoodField(this.model.hasEmptyFields() ? this.model.popRandomEmptyField() : null);
                    this.energy = this.settings.snake.initialEnergy;
                } else {
                    this.model.popEmptyField(newHead);
                    --this.energy;
                    if (this.energy <= 0) {
                        status = SnakeStatus.STARVATION;
                    }
                }
                this.model.pushSnake(newHead);
                this.lastMoveDirection = this.nextMoveDirection;
                this.snake = this.model.snakeCoordinates;
            }
        }

        return {
            foodEaten,
            moveDirection,
            status,
            oldHead,
            newHead
        };
    }

}
