import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {concatMap, map} from 'rxjs/operators';
import * as AppActions from './evolution.actions';
import {EvolutionService} from '../services/evolution.service';
import {Evolution} from '../models/evolution.model';

@Injectable()
export class EvolutionEffects {

    loadEvolutions$ = createEffect(() => this.actions$.pipe(
        ofType(AppActions.loadEvolutions),
        concatMap(action => this.evolutionService.getAllEvolutions()),
        map((evolutions: Evolution[]) => AppActions.evolutionsLoaded({evolutions: evolutions}))
    ));

    createEvolution$ = createEffect(() => this.actions$.pipe(
        ofType(AppActions.createEvolution),
        concatMap(action => this.evolutionService.createEvolution()),
        map((evolution: Evolution) => AppActions.evolutionCreated({evolution}))
    ));

    deleteEvolution$ = createEffect(() => this.actions$.pipe(
       ofType(AppActions.deleteEvolution),
       concatMap(action => this.evolutionService.deleteEvolution(action.evolutionId)),
       map((evolutionId: number) => AppActions.evolutionDeleted({evolutionId}))
    ));

    constructor(private readonly actions$: Actions,
                private readonly evolutionService: EvolutionService) {
    }

}
