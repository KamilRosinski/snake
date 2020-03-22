import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EvolutionRoutingModule} from './evolution-routing.module';
import {EvolutionComponent} from './evolution.component';
import {EvolutionListComponent} from './components/evolution-list/evolution-list.component';
import {StoreModule} from '@ngrx/store';
import {evolutionReducers} from './store/evolution.reducers';


@NgModule({
    declarations: [
        EvolutionComponent,
        EvolutionListComponent
    ],
    imports: [
        CommonModule,
        EvolutionRoutingModule,
        StoreModule.forFeature("evolution", evolutionReducers)
    ]
})
export class EvolutionModule {
}
