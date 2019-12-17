import {Pipe, PipeTransform} from '@angular/core';
import {Coordinates} from '../shared/coordinates';

@Pipe({
    name: 'snakeFormatter'
})
export class SnakeFormatterPipe implements PipeTransform {

    transform(coordinates: Coordinates[]): string {
        return coordinates.map(c => `${c.x} ${c.y}`).join(', ');
    }

}
