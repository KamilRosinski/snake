import {Coordinates, Direction, GameSettings, MoveResult, SnakeModel, SnakeStatus} from './game.model';

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
    private energy: number;

    get snakeCoordinates(): Coordinates[] {
        return this.model.snakeFields.map((field: number) => this.number2coordinates(field));
    }

    get headCoordinates(): Coordinates {
        return this.number2coordinates(this.model.snakeFields[0]);
    }

    get foodCoordinates(): Coordinates {
        return this.number2coordinates(this.model.foodField);
    }

    get snakeEnergy(): number {
        return this.energy;
    }

    constructor(private readonly settings: GameSettings,
                initialDirection: Direction = Direction.EAST) {

        this.model = {
            foodField: undefined,
            snakeFields: [],
            emptyFields: new Set<number>(Array(this.settings.board.width * this.settings.board.height).keys())
        };

        this.energy = this.settings.snake.initialEnergy;
        this.lastMoveDirection = initialDirection;
        this.nextMoveDirection = initialDirection;

        const headPosition: number = this.coordinates2number(new Coordinates(
            Math.floor((this.settings.board.width - 1) / 2),
            Math.floor((this.settings.board.height - 1) / 2)
        ));
        this.model.emptyFields.delete(headPosition);
        this.model.snakeFields.unshift(headPosition);

        this.model.foodField = this.selectFoodField();
        this.model.emptyFields.delete(this.model.foodField);
    }

    private selectFoodField(): number {
        return this.model.emptyFields.size > 0
            ? Array.from(this.model.emptyFields)[Math.floor(Math.random() * this.model.emptyFields.size)]
            : undefined;
    }

    turn(newDirection: Direction): void {
        if ([90, 270].includes(Math.abs(this.lastMoveDirection - newDirection))) {
            this.nextMoveDirection = newDirection;
        }
    }

    move(): MoveResult {
        const newHeadCoordinates: Coordinates = this.number2coordinates(this.model.snakeFields[0])
            .add(Snake.TRANSLATION_VECTORS.get(this.nextMoveDirection));
        const newHeadField: number = this.coordinates2number(newHeadCoordinates);

        let foodEaten: boolean = false;
        let status: SnakeStatus = SnakeStatus.ALIVE;

        if (this.energy <= 0) {
            status = SnakeStatus.STARVATION;
        } else if (newHeadCoordinates.x < 0 || newHeadCoordinates.x >= this.settings.board.width
            || newHeadCoordinates.y < 0 || newHeadCoordinates.y >= this.settings.board.height) {
            status = SnakeStatus.WALL_COLLISION;
        } else if (this.model.snakeFields.some((snakeField: number) => snakeField === newHeadField)
                && newHeadField !== this.model.snakeFields[this.model.snakeFields.length - 1]) {
            status = SnakeStatus.TAIL_COLLISION;
        } else {
            this.lastMoveDirection = this.nextMoveDirection;
            this.model.snakeFields.unshift(newHeadField);
            if (this.model.foodField === newHeadField) {
                foodEaten = true;
                this.energy = this.settings.snake.initialEnergy;
                this.model.foodField = this.selectFoodField();
                this.model.emptyFields.delete(this.model.foodField);
            } else {
                --this.energy;
                this.model.emptyFields.delete(newHeadField);
                this.model.emptyFields.add(this.model.snakeFields.pop());
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
