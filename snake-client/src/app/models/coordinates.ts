export class Coordinates {

    constructor(public readonly x: number, public readonly y: number) {
    }

    add(other: Coordinates): Coordinates {
        return new Coordinates(this.x + other.x, this.y + other.y);
    }

}
