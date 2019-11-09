import {Dimensions} from "../../shared/dimensions";

export interface SnakeControlData {

    readonly valid: boolean,
    readonly boardDimensions: Dimensions,
    readonly snakeSpeed: number;

}