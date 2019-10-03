import * as Hammer from 'hammerjs'

import {Component, HostListener, OnInit} from '@angular/core';
import {MessagingService} from "../messages/messaging.service";
import {GameState} from "./game-state";
import {Direction} from "./direction";

@Component({
    selector: 'app-snake',
    templateUrl: './snake.component.html',
    styleUrls: ['./snake.component.scss']
})
export class SnakeComponent implements OnInit {

    private static readonly DIRECTIONS: Map<string|number, Direction> = new Map<string|number, Direction>([
        ['ArrowUp', Direction.NORTH],
        ['ArrowRight', Direction.EAST],
        ['ArrowDown', Direction.SOUTH],
        ['ArrowLeft', Direction.WEST],
        [Hammer.DIRECTION_UP, Direction.NORTH],
        [Hammer.DIRECTION_RIGHT, Direction.EAST],
        [Hammer.DIRECTION_DOWN, Direction.SOUTH],
        [Hammer.DIRECTION_LEFT, Direction.WEST]
    ]);

    private gameState: GameState = GameState.NEW;
    // private speedMs: number = 1000;

    constructor(private messagingService: MessagingService) {
    }

    ngOnInit(): void {
        // interval(this.speedMs).subscribe(value => this.messagingService.sendMessage(value.toString()));
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

    swipe(event: any): void {
        this.changeDirection(SnakeComponent.DIRECTIONS.get(event.direction));
    }

    @HostListener('document:keydown', ['$event'])
    keydown(event: KeyboardEvent): void {
        this.changeDirection(SnakeComponent.DIRECTIONS.get(event.code));
    }

    private changeDirection(newDirection: Direction): void {
        if (this.gameState === GameState.RUNNING) {
            this.messagingService.sendMessage(`New direction: ${Direction[newDirection].toLowerCase()}`);
        }
    }

}
