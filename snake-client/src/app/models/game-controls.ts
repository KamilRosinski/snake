export interface GameControls {
    board: BoardControls;
    snake: SnakeControls;
}

interface BoardControls {
    width: number;
    height: number;
}

interface SnakeControls {
    speed: number;
    energy: number;
}
