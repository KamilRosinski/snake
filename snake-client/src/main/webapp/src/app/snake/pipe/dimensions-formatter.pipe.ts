import {Pipe, PipeTransform} from '@angular/core';
import {Dimensions} from '../shared/dimensions';

@Pipe({
    name: 'dimensionsFormatter'
})
export class DimensionsFormatterPipe implements PipeTransform {

    transform(dimensions: Dimensions): string {
        return `-0.5 -0.5 ${dimensions.numberOfColumns} ${dimensions.numberOfRows}`;
    }

}
