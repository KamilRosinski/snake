import {Component, OnInit} from '@angular/core';
import {MessagingService} from "../messages/messaging.service";

@Component({
    selector: 'app-snake',
    templateUrl: './snake.component.html',
    styleUrls: ['./snake.component.scss']
})
export class SnakeComponent implements OnInit {

    constructor(private messagingService: MessagingService) {
    }

    ngOnInit() {
    }

    sendMessage() {
        this.messagingService.sendMessage('Test message from snake component!');
    }
}
