import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map} from 'rxjs/operators';
import * as AppActions from './app.actions';

@Injectable()
export class AppEffects {

    sendMessage$ = createEffect(() => this.actions$.pipe(
        ofType(AppActions.addMessage),
        map(action => AppActions.addMessageWithTimestamp({payload: {
            body: action.payload,
            timestamp: new Date().getTime()
        }}))
    ));

    constructor(private readonly actions$: Actions) {
    }

}
