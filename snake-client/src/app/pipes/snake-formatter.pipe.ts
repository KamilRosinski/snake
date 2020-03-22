import {Coordinates} from '../models/game.model';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'snakeFormatter'
})
export class SnakeFormatterPipe implements PipeTransform {

    transform(coordinates: Coordinates[]): string {
        return coordinates.map(c => `${c.x} ${c.y}`).join(', ');
    }

}
