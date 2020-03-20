import {Coordinates} from "./coordinates";
import {BoardDimensions} from "./boardDimensions";

export class SnakeModel {

    private _food: number;
    private readonly _snake: number[] = [];
    private readonly _empty: Set<number> = new Set<number>();

    private readonly _encodeCoordinates: (coordinates: Coordinates) => number;
    private readonly _decodeCoordinates: (coordinates: number) => Coordinates;

    constructor(boardDimensions: BoardDimensions) {

        this._encodeCoordinates = (coords: Coordinates) =>
            coords !== null ? coords.x + coords.y * boardDimensions.numberOfColumns : null;

        this._decodeCoordinates = (coords: number) =>
            coords !== null ? new Coordinates(coords % boardDimensions.numberOfColumns, Math.floor(coords / boardDimensions.numberOfColumns)) : null;

        for (let row = 0; row < boardDimensions.numberOfRows; ++row) {
            for (let column = 0; column < boardDimensions.numberOfColumns; ++column) {
                this.pushEmptyField(new Coordinates(column, row));
            }
        }
    }

    pushEmptyField(coordinates: Coordinates): void {
        this._empty.add(this._encodeCoordinates(coordinates));
    }

    popEmptyField(coordinates: Coordinates): void {
        this._empty.delete(this._encodeCoordinates(coordinates));
    }

    popRandomEmptyField(): Coordinates {
        const randomField: number = Array.from(this._empty.values())[Math.floor(Math.random() * this._empty.size)];
        this._empty.delete(randomField);
        return this._decodeCoordinates(randomField);
    }

    updateFoodField(newFoodCoordinates: Coordinates): void {
        this._food = this._encodeCoordinates(newFoodCoordinates);
    }

    pushSnake(newSnakeCoordinates: Coordinates): void {
        this._snake.unshift(this._encodeCoordinates(newSnakeCoordinates));
    }

    popSnake(): Coordinates {
        return this._decodeCoordinates(this._snake.pop());
    }

    isSnake(coordinates: Coordinates): boolean {
        return this._snake.includes(this._encodeCoordinates(coordinates));
    }

    get snake(): Coordinates[] {
        return this._snake.map(c => this._decodeCoordinates(c));
    }

    get head(): Coordinates {
        return this._decodeCoordinates(this._snake[0]);
    }

    get food(): Coordinates {
        return this._decodeCoordinates(this._food);
    }

    isFood(coordinates: Coordinates): boolean {
        return this._encodeCoordinates(coordinates) === this._food;
    }

    hasEmptyFields(): boolean {
        return this._empty.size > 0;
    }
}