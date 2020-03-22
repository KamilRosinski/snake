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

export interface MoveResult {
    readonly status: SnakeStatus;
    readonly foodEaten: boolean;
    readonly moveDirection: Direction;
    readonly oldHead: Coordinates;
    readonly newHead: Coordinates;
}

export interface Coordinates {
    x: number;
    y: number;
}
