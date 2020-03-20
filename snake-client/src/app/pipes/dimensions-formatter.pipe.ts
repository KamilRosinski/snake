import {Pipe, PipeTransform} from '@angular/core';
import {BoardDimensions} from '../models/boardDimensions';

@Pipe({
    name: 'dimensionsFormatter'
})
export class DimensionsFormatterPipe implements PipeTransform {

    transform(dimensions: BoardDimensions): string {
        return `-0.5 -0.5 ${dimensions.numberOfColumns} ${dimensions.numberOfRows}`;
    }

}
