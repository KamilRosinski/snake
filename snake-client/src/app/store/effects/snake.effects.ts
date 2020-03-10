import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {sendMessage, sendMessageWithTimestamp} from '../actions/snake.actions';
import {map} from 'rxjs/operators';

@Injectable()
export class SnakeEffects {

    sendMessageWithTimestamp$ = createEffect(() => this.actions$.pipe(
        ofType(sendMessage),
        map(action => sendMessageWithTimestamp({payload: {
            body: action.payload,
            timestamp: new Date().getTime()
        }}))
    ));

    constructor(private readonly actions$: Actions) {
    }

}