import {Component, OnInit} from '@angular/core';
import {Message} from "./message";
import {MessagingService} from "./messaging.service";
import {SortOrder} from "./sort-order";

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

    order: SortOrder = SortOrder.ASCENDING;

    private _messages: Array<Message> = [];

    constructor(private messagingService: MessagingService) {
    }

    ngOnInit(): void {
        this.messagingService.getMessenger().subscribe(message => this._messages.push(message));
    }

    clearMessages(): void {
      this._messages = [];
    }

    toggleSortOrder(): void {
        this.order *= -1;
    }

    get messagesLength(): number {
        return this._messages.length;
    }

    get sortedMessages(): Array<Message> {
        return this._messages.sort((m1, m2) => this.order * (m1.timestamp.getTime() - m2.timestamp.getTime()));
    }

}
