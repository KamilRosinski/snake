import {Component, OnInit} from '@angular/core';
import {Evolution} from '../../models/evolution.model';
import {Store} from '@ngrx/store';
import {EvolutionState} from '../../store/evolution.state';
import {createEvolution, deleteEvolution, loadEvolutions} from '../../store/evolution.actions';
import {selectAllEvolutions} from '../../store/evolution.selectors';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-evolution-list',
    templateUrl: './evolution-list.component.html',
    styleUrls: ['./evolution-list.component.scss']
})
export class EvolutionListComponent implements OnInit {

    evolutions$: Observable<Evolution[]>;

    constructor(private readonly store: Store<EvolutionState>) {
    }

    ngOnInit(): void {
        this.store.dispatch(loadEvolutions());
        this.evolutions$ = this.store.select(selectAllEvolutions);
    }

    delete(evolutionId: number): void {
        this.store.dispatch(deleteEvolution({evolutionId}))
    }

    create(): void {
        this.store.dispatch(createEvolution());
    }

}
