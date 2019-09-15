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

    private _messages: Array<Message> = [];
    private _order: SortOrder = SortOrder.ASCENDING;

    constructor(private messagingService: MessagingService) {
    }

    ngOnInit(): void {
        this.messagingService.getMessenger().subscribe(message => this._messages.push(message));
    }

    clearMessages(): void {
      this._messages = [];
    }

    toggleSortOrder(): void {
        this._order = this._order === SortOrder.ASCENDING ? SortOrder.DESCENDING : SortOrder.ASCENDING;
    }

    get messagesLength(): number {
        return this._messages.length;
    }

    get sortedMessages(): Array<Message> {
        return this._messages.sort((m1, m2) => this.compareTimestamps(m1.timestamp.getTime(), m2.timestamp.getTime()));
    }

    private compareTimestamps(timestamp1: number, timestamp2: number): number {
        return this._order === SortOrder.ASCENDING ? timestamp1 - timestamp2 : timestamp2 - timestamp1;
    }

}
