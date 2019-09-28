import {Component, OnInit} from '@angular/core';
import {MessagingService} from "../messages/messaging.service";
import {GameState} from "./game-state";

@Component({
    selector: 'app-snake',
    templateUrl: './snake.component.html',
    styleUrls: ['./snake.component.scss']
})
export class SnakeComponent implements OnInit {

    private gameState: GameState = GameState.NEW;

    constructor(private messagingService: MessagingService) {
    }

    ngOnInit(): void {
    }

    play(): void {
        this.gameState = GameState.RUNNING;
        this.messagingService.sendMessage('Game started');
    }

    isPlayable(): boolean {
        return this.gameState !== GameState.RUNNING;
    }

    pause(): void {
        this.gameState = GameState.PAUSED;
        this.messagingService.sendMessage('Game paused');
    }

    isPausable(): boolean {
        return this.gameState === GameState.RUNNING;
    }

    reset(): void {
        this.gameState = GameState.NEW;
        this.messagingService.sendMessage('Game reset');
    }

    isResettable(): boolean {
        return this.gameState !== GameState.NEW;
    }

}
