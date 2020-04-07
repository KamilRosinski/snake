import {Coordinates, Direction, GameSettings, MoveResult, SnakeStatus} from './game.model';

export class Snake {

    private static readonly TRANSLATION_VECTORS: Map<Direction, Coordinates> = new Map<Direction, Coordinates>([
        [Direction.NORTH, new Coordinates(0, -1)],
        [Direction.EAST, new Coordinates(1, 0)],
        [Direction.SOUTH, new Coordinates(0, 1)],
        [Direction.WEST, new Coordinates(-1, 0)]
    ]);

    foodField: number;
    readonly snakeFields: number[] = [];
    readonly emptyFields: Set<number> = new Set<number>(Array(this.settings.board.width * this.settings.board.height).keys());

    private lastMoveDirection: Direction;
    private nextMoveDirection: Direction;
    private energy: number;

    get snakeCoordinates(): Coordinates[] {
        return this.snakeFields.map((field: number) => this.number2coordinates(field));
    }

    get headCoordinates(): Coordinates {
        return this.number2coordinates(this.snakeFields[0]);
    }

    get foodCoordinates(): Coordinates {
        return this.number2coordinates(this.foodField);
    }

    get snakeEnergy(): number {
        return this.energy;
    }

    constructor(private readonly settings: GameSettings,
                initialDirection: Direction = Direction.EAST) {

        this.energy = this.settings.snake.initialEnergy;
        this.lastMoveDirection = initialDirection;
        this.nextMoveDirection = initialDirection;

        const headPosition: number = this.coordinates2number(new Coordinates(
            Math.floor((this.settings.board.width - 1) / 2),
            Math.floor((this.settings.board.height - 1) / 2)
        ));
        this.emptyFields.delete(headPosition);
        this.snakeFields.unshift(headPosition);

        this.foodField = this.selectFoodField();
        this.emptyFields.delete(this.foodField);
    }

    private selectFoodField(): number {
        return this.emptyFields.size > 0
            ? Array.from(this.emptyFields)[Math.floor(Math.random() * this.emptyFields.size)]
            : undefined;
    }

    turn(newDirection: Direction): void {
        if ([90, 270].includes(Math.abs(this.lastMoveDirection - newDirection))) {
            this.nextMoveDirection = newDirection;
        }
    }

    move(): MoveResult {
        const newHeadCoordinates: Coordinates = this.number2coordinates(this.snakeFields[0])
            .add(Snake.TRANSLATION_VECTORS.get(this.nextMoveDirection));
        const newHeadField: number = this.coordinates2number(newHeadCoordinates);

        let foodEaten: boolean = false;
        let status: SnakeStatus = SnakeStatus.ALIVE;

        if (this.energy <= 0) {
            status = SnakeStatus.STARVATION;
        } else if (newHeadCoordinates.x < 0 || newHeadCoordinates.x >= this.settings.board.width
            || newHeadCoordinates.y < 0 || newHeadCoordinates.y >= this.settings.board.height) {
            status = SnakeStatus.WALL_COLLISION;
        } else if (this.snakeFields.some((snakeField: number) => snakeField === newHeadField)
                && newHeadField !== this.snakeFields[this.snakeFields.length - 1]) {
            status = SnakeStatus.TAIL_COLLISION;
        } else {
            this.lastMoveDirection = this.nextMoveDirection;
            this.snakeFields.unshift(newHeadField);
            if (this.foodField === newHeadField) {
                foodEaten = true;
                this.energy = this.settings.snake.initialEnergy;
                this.foodField = this.selectFoodField();
                this.emptyFields.delete(this.foodField);
            } else {
                --this.energy;
                this.emptyFields.delete(newHeadField);
                this.emptyFields.add(this.snakeFields.pop());
            }
        }

        return {
            foodEaten,
            status,
            energy: this.energy,
        };
    }

    private coordinates2number(coordinates: Coordinates): number {
        return coordinates.y * this.settings.board.width + coordinates.x;
    }

    private number2coordinates(coordinates: number): Coordinates {
        return new Coordinates(
            coordinates % this.settings.board.width,
            Math.floor(coordinates / this.settings.board.width)
        );
    }

}
