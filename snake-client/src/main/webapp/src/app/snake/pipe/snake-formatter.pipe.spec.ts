import {SnakeFormatterPipe} from './snake-formatter.pipe';
import {Coordinates} from "../coordinates";

describe('SnakeFormatterPipe', () => {

    const tested = new SnakeFormatterPipe();

    it('should format empty array', () => {

        // given
        const coordinates: Coordinates[] = [];

        // when
        const formatted: string = tested.transform(coordinates);

        // then
        expect(formatted).toEqual('');
    });

    it('should format non empty array', () => {

        // given
        const coordinates: Coordinates[] = [
            new Coordinates(-1, 0),
            new Coordinates(3, 2)
        ];

        // when
        const formatted: string = tested.transform(coordinates);

        // then
        expect(formatted).toEqual('-1 0, 3 2');
    });
});
