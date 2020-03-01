class MessageIdGenerator {

    private static CURRENT_ID: number = 0;

    static generateId(): number {
        return MessageIdGenerator.CURRENT_ID++;
    }

}

export class Message {

    readonly timestamp: Date;
    readonly id: number;

    constructor(public readonly body: string) {
        this.timestamp = new Date();
        this.id = MessageIdGenerator.generateId();
    }

}
