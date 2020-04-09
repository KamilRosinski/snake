import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {EvolutionState} from '../../store/evolution.state';

@Component({
    selector: 'app-evolution',
    templateUrl: './evolution.component.html',
    styleUrls: ['./evolution.component.scss']
})
export class EvolutionComponent implements OnInit {

    constructor(private readonly activatedRoute: ActivatedRoute,
                private readonly store: Store<EvolutionState>) {
    }

    ngOnInit() {
    }

}
