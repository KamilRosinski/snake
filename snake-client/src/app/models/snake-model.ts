import {Coordinates} from './coordinates';
import {BoardSettings} from '../components/snake/snake.component';

export class SnakeModel {

    private food: number;
    private readonly snake: number[] = [];
    private readonly empty: Set<number> = new Set<number>();

    constructor(private readonly boardSettings: BoardSettings) {

        for (let row = 0; row < this.boardSettings.height; ++row) {
            for (let column = 0; column < this.boardSettings.width; ++column) {
                this.pushEmptyField(new Coordinates(column, row));
            }
        }
    }

    private encodeCoordinates(coordinates: Coordinates): number {
        return !coordinates ? undefined : coordinates.x + coordinates.y * this.boardSettings.width;
    }

    private decodeCoordinates(coordinates: number): Coordinates {
        return !coordinates ? undefined : new Coordinates(coordinates % this.boardSettings.width,
            Math.floor(coordinates / this.boardSettings.width));
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