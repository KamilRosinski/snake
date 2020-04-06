export interface GameSettings {
    board: BoardSettings;
    snake: SnakeSettings;
}

export interface BoardSettings {
    width: number;
    height: number;
}

export interface SnakeSettings {
    speed: number;
    initialEnergy: number;
}

export enum GameStatus {
    NEW,
    RUNNING,
    PAUSED,
    FINISHED
}

export enum SnakeStatus {
    ALIVE,
    WALL_COLLISION,
    TAIL_COLLISION,
    STARVATION
}

export enum Direction {
    NORTH = 0,
    EAST = 90,
    SOUTH = 180,
    WEST = 270
}

export class Coordinates {

    constructor(public readonly x: number, public readonly y: number) {
    }

    add(other: Coordinates): Coordinates {
        return new Coordinates(this.x + other.x, this.y + other.y);
    }

}

export interface SnakeModel {
    foodField: number;
    readonly snakeFields: number[];
    readonly emptyFields: Set<number>;
}

export interface MoveResult {
    readonly status: SnakeStatus;
    readonly foodEaten: boolean;
    readonly energy: number;
}
