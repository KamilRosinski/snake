import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Message} from "../message";

@Injectable({
    providedIn: 'root'
})
export class MessagingService {

    private readonly messenger: Subject<Message> = new Subject<Message>();

    sendMessage(message: string): void {
        this.messenger.next({
            timestamp: new Date(),
            body: message
        });
    }

    getMessenger(): Observable<Message> {
        return this.messenger.asObservable();
    }

}
