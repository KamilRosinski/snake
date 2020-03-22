import {Pipe, PipeTransform} from '@angular/core';
import {BoardSettings} from '../models/game.model';

@Pipe({
    name: 'dimensionsFormatter'
})
export class DimensionsFormatterPipe implements PipeTransform {

    transform(boardSettings: BoardSettings): string {
        return `-0.5 -0.5 ${boardSettings.width} ${boardSettings.height}`;
    }

}
