export interface GameControls {
    board: BoardControls;
    snake: SnakeControls;
}

class BoardControls {
    width: number;
    height: number;
}

class SnakeControls {
    speed: number;
    energy: number;
}
