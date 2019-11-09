import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Message} from "../message";

@Injectable({
    providedIn: 'root'
})
export class MessagingService {

    private readonly _messageSubject: Subject<Message> = new Subject<Message>();

    sendMessage(message: string): void {
        this._messageSubject.next({
            timestamp: new Date(),
            body: message
        });
    }

    getMessages(): Observable<Message> {
        return this._messageSubject.asObservable();
    }

}
