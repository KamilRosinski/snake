import {Component, OnInit} from '@angular/core';
import {Message} from "./message";
import {MessagingService} from "./messaging.service";

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

    messages: Array<Message> = [];

    constructor(private messagingService: MessagingService) {
    }

    ngOnInit() {
        this.messagingService.getMessenger().subscribe(message => this.messages.push(message));
    }

    clearMessages() {
      this.messages = [];
    }

}
