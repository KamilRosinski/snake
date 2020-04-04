import * as Hammer from 'hammerjs'

import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Coordinates, Direction, GameSettings, GameStatus, MoveResult, SnakeStatus} from '../../models/game.model';
import {interval, Observable, Subscription} from 'rxjs';
import {Snake} from '../../models/snake';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {GameState} from '../../store/game.state';
import {selectScore, selectStatus} from '../../store/game.selectors';
import {incrementScore, resetScore, updateStatus} from '../../store/game.actions';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-snake',
    templateUrl: './snake.component.html',
    styleUrls: ['./snake.component.scss']
})
export class SnakeComponent implements OnInit, OnDestroy {

    private static readonly DIRECTIONS: Map<string | number, Direction> = new Map<string | number, Direction>([
        ['ArrowUp', Direction.NORTH],
        ['ArrowRight', Direction.EAST],
        ['ArrowDown', Direction.SOUTH],
        ['ArrowLeft', Direction.WEST],
        [Hammer.DIRECTION_UP, Direction.NORTH],
        [Hammer.DIRECTION_RIGHT, Direction.EAST],
        [Hammer.DIRECTION_DOWN, Direction.SOUTH],
        [Hammer.DIRECTION_LEFT, Direction.WEST]
    ]);

    private intervalSubscription: Subscription;

    snake: Snake;
    settings: GameSettings;
    score$: Observable<number>;
    gameFinished$: Observable<boolean>;

    get snakeCoordinates(): Coordinates[] {
        return this.snake.snakeCoordinates;
    }

    get headCoordinates(): Coordinates {
        return this.snake.headCoordinates;
    }

    get foodCoordinates(): Coordinates {
        return this.snake.foodCoordinates;
    }

    private readonly subscription: Subscription = new Subscription();

    constructor(private readonly activatedRoute: ActivatedRoute,
                private readonly store: Store<GameState>) {
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe((params: { width: number; height: number; speed: number; energy: number }) => {
            this.settings = {
                board: {
                    width: params.width,
                    height: params.height
                },
                snake: {
                    speed: params.speed,
                    initialEnergy: params.energy
                }
            };
        });
        this.store.dispatch(updateStatus({status: GameStatus.NEW}));
        this.subscription.add(this.store.select(selectStatus).subscribe((status: GameStatus) => this.gameStatusChanged(status)));
        this.gameFinished$ = this.store.select(selectStatus).pipe(map((status: GameStatus) => status === GameStatus.FINISHED));
        this.score$ = this.store.select(selectScore);
    }

    ngOnDestroy(): void {
        if (this.intervalSubscription) {
            this.intervalSubscription.unsubscribe();
        }
        this.subscription.unsubscribe();
    }

    private gameStatusChanged(gameStatus: GameStatus): void {
        switch (gameStatus) {
            case GameStatus.RUNNING:
                this.intervalSubscription = interval(1e3 / this.settings.snake.speed).subscribe(_ => this.move());
                break;
            case GameStatus.PAUSED:
                this.intervalSubscription.unsubscribe();
                break;
            case GameStatus.NEW:
                if (this.intervalSubscription) {
                    this.intervalSubscription.unsubscribe();
                }
                this.snake = new Snake(this.settings);
                this.store.dispatch(resetScore());
                break;
            case GameStatus.FINISHED:
                this.intervalSubscription.unsubscribe();
                break;
        }
    }

    private move(): void {
        const moveResult: MoveResult = this.snake.move();
        if (moveResult.status === SnakeStatus.ALIVE) {
            if (moveResult.foodEaten) {
                this.store.dispatch(incrementScore({increment: 1}));
            }
        } else {
            this.store.dispatch(updateStatus({status: GameStatus.FINISHED}));

        }
    }

    swipe(event: any): void {
        this.changeDirection(SnakeComponent.DIRECTIONS.get(event.direction));
    }

    @HostListener('document:keydown', ['$event'])
    keydown(event: KeyboardEvent): void {
        this.changeDirection(SnakeComponent.DIRECTIONS.get(event.code));
    }

    private changeDirection(newDirection: Direction): void {
        if (this.snake) {
            this.snake.turn(newDirection);
        }
    }

    get snakeEnergy(): number {
        return this.snake.snakeEnergy;
    }

}
