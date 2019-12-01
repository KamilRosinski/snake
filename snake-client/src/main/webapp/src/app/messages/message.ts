export class Message {

    readonly timestamp: Date;

    constructor(public readonly body: string) {
        this.timestamp = new Date();
    }

}
