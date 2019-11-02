import {DimensionsFormatterPipe} from './dimensions-formatter.pipe';
import {Dimensions} from "../dimensions";

describe('DimensionsFormatterPipe', () => {

    const tested = new DimensionsFormatterPipe();

    it('should format board dimensions to view-box', () => {

        // given
        const dimensions: Dimensions = {
            numberOfRows: 3,
            numberOfColumns: 4
        };

        // when
        const formatted: string = tested.transform(dimensions);

        // then
        expect(formatted).toEqual('-0.5 -0.5 4 3');
    });

});
