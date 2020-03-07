export class MessageIdGenerator {

    private static CURRENT_ID: number = 0;

    static generateId(): number {
        return MessageIdGenerator.CURRENT_ID++;
    }

}

export interface Message {

    body: string;
    timestamp: number;
    id: number;

}
