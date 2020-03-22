import {BoardSettings, Coordinates, Direction, GameSettings, MoveResult, SnakeStatus} from './game.model';

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
    snake: Coordinates[];
    energy: number;

    constructor(private readonly settings: GameSettings,
                initialDirection: Direction = Direction.EAST) {

        this.model = new SnakeModel(this.settings.board);
        this.energy = this.settings.snake.initialEnergy;
        this.lastMoveDirection = initialDirection;
        this.nextMoveDirection = initialDirection;

        const headCoordinates: Coordinates = {
            x: Math.floor(this.settings.board.width / 2),
            y: Math.floor(this.settings.board.height / 2)
        };
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
        const translation: Coordinates = Snake.TRANSLATION_VECTORS.get(this.nextMoveDirection);
        const newHead: Coordinates = {
            x: oldHead.x + translation.x,
            y: oldHead.y + translation.y
        };
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

export class SnakeModel {

    private food: number;
    private readonly snake: number[] = [];
    private readonly empty: Set<number> = new Set<number>();

    constructor(private readonly boardSettings: BoardSettings) {

        for (let row = 0; row < this.boardSettings.height; ++row) {
            for (let column = 0; column < this.boardSettings.width; ++column) {
                this.pushEmptyField({
                    x: column,
                    y: row
                });
            }
        }
    }

    private encodeCoordinates(coordinates: Coordinates): number {
        return !coordinates ? undefined : coordinates.x + coordinates.y * this.boardSettings.width;
    }

    private decodeCoordinates(coordinates: number): Coordinates {
        return !coordinates ? undefined : {
            x: coordinates % this.boardSettings.width,
            y: Math.floor(coordinates / this.boardSettings.width)
        };
    }

    pushEmptyField(coordinates: Coordinates): void {
        this.empty.add(this.encodeCoordinates(coordinates));
    }

    popEmptyField(coordinates: Coordinates): void {
        this.empty.delete(this.encodeCoordinates(coordinates));
    }

    popRandomEmptyField(): Coordinates {
        const randomField: number = Array.from(this.empty.values())[Math.floor(Math.random() * this.empty.size)];
        this.empty.delete(randomField);
        return this.decodeCoordinates(randomField);
    }

    updateFoodField(newFoodCoordinates: Coordinates): void {
        this.food = this.encodeCoordinates(newFoodCoordinates);
    }

    pushSnake(newSnakeCoordinates: Coordinates): void {
        this.snake.unshift(this.encodeCoordinates(newSnakeCoordinates));
    }

    popSnake(): Coordinates {
        return this.decodeCoordinates(this.snake.pop());
    }

    get snakeCoordinates(): Coordinates[] {
        return this.snake.map((coordinates: number) => this.decodeCoordinates(coordinates));
    }

    get headCoordinates(): Coordinates {
        return this.decodeCoordinates(this.snake[0]);
    }

    get foodCoordinates(): Coordinates {
        return this.decodeCoordinates(this.food);
    }

    isFood(coordinates: Coordinates): boolean {
        return this.encodeCoordinates(coordinates) === this.food;
    }

    isSnake(coordinates: Coordinates): boolean {
        return this.snake.includes(this.encodeCoordinates(coordinates));
    }

    hasEmptyFields(): boolean {
        return this.empty.size > 0;
    }

}
