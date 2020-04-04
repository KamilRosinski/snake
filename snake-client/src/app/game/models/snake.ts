import {Coordinates, Direction, GameSettings, MoveResult, SnakeModel, SnakeStatus} from './game.model';

export class Snake {

    private static readonly TRANSLATION_VECTORS: Map<Direction, Coordinates> = new Map<Direction, Coordinates>([
        [Direction.NORTH, {x: 0, y: -1}],
        [Direction.EAST, {x: 1, y: 0}],
        [Direction.SOUTH, {x: 0, y: 1}],
        [Direction.WEST, {x: -1, y: 0}]
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

        const headPosition: number = this.coordinates2number({
            x: Math.floor((this.settings.board.width - 1) / 2),
            y: Math.floor((this.settings.board.height - 1) / 2)
        });
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
        const oldHeadPosition: number = this.model.snakeFields[0];
        const oldHeadCoordinates: Coordinates = this.number2coordinates(oldHeadPosition);
        const translation: Coordinates = Snake.TRANSLATION_VECTORS.get(this.nextMoveDirection);
        const newHeadCoordinates: Coordinates = {
            x: oldHeadCoordinates.x + translation.x,
            y: oldHeadCoordinates.y + translation.y
        };

        let foodEaten: boolean = false;
        let status: SnakeStatus = SnakeStatus.ALIVE;

        if (newHeadCoordinates.x < 0 || newHeadCoordinates.x >= this.settings.board.width
            || newHeadCoordinates.y < 0 || newHeadCoordinates.y >= this.settings.board.height) {
            status = SnakeStatus.WALL_COLLISION;
        } else {
            const newHeadPosition: number = this.coordinates2number(newHeadCoordinates);
            if (this.model.foodField === newHeadPosition) {
                foodEaten = true;
            } else {
                this.model.emptyFields.add(this.model.snakeFields.pop());
            }

            if (this.model.snakeFields.includes(newHeadPosition)) {
                status = SnakeStatus.TAIL_COLLISION;
            } else {
                if (!foodEaten) {
                    this.model.emptyFields.delete(newHeadPosition);
                    --this.energy;
                    if (this.energy <= 0) {
                        status = SnakeStatus.STARVATION;
                    }
                } else {
                    this.model.foodField = this.selectFoodField();
                    if (this.model.foodField) {
                        this.model.emptyFields.delete(this.model.foodField);
                    }
                    this.energy = this.settings.snake.initialEnergy;
                }
                this.model.snakeFields.unshift(newHeadPosition);
                this.lastMoveDirection = this.nextMoveDirection;
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
        return {
            x: coordinates % this.settings.board.width,
            y: Math.floor(coordinates / this.settings.board.width)
        };
    }

}
