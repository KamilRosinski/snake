import {Component, OnDestroy, OnInit} from '@angular/core';
import {Message} from "./message";
import {MessagingService} from "./service/messaging.service";
import {SortOrder} from "./sort-order";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {

    private messages: Message[] = [];
    private sortOrder: SortOrder = SortOrder.DESCENDING;
    private subscription: Subscription;

    constructor(private messagingService: MessagingService) {
    }

    ngOnInit(): void {
        this.subscription = this.messagingService.getMessenger().subscribe(message => {
            this.messages.push(message);
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    clearMessages(): void {
        this.messages = [];
    }

    toggleSortOrder(): void {
        this.sortOrder *= -1;
    }

    hasMessages(): boolean {
        return this.messages.length > 0;
    }

    get sortedMessages(): Message[] {
        return this.messages.sort((m1, m2) => this.sortOrder * (m1.timestamp.getTime() - m2.timestamp.getTime()));
    }

    isSortedAscending(): boolean {
        return this.sortOrder === SortOrder.ASCENDING;
    }

}
