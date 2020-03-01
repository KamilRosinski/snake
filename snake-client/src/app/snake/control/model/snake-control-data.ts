import {Dimensions} from "../../shared/dimensions";

export interface SnakeControlData {

    readonly boardDimensions: Dimensions,
    readonly snakeSpeed: number;
    readonly snakeEnergy: number;

}