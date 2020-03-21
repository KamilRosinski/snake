import {Pipe, PipeTransform} from '@angular/core';
import {BoardDimensions} from '../models/boardDimensions';
import {BoardSettings} from '../components/snake/snake.component';

@Pipe({
    name: 'dimensionsFormatter'
})
export class DimensionsFormatterPipe implements PipeTransform {

    transform(boardSettings: BoardSettings): string {
        return `-0.5 -0.5 ${boardSettings.width} ${boardSettings.height}`;
    }

}
