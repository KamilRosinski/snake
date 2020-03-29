import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EvolutionRoutingModule} from './evolution-routing.module';
import {EvolutionListComponent} from './components/evolution-list/evolution-list.component';
import {StoreModule} from '@ngrx/store';
import {evolutionReducers} from './store/evolution.reducers';


@NgModule({
    declarations: [
        EvolutionListComponent
    ],
    imports: [
        CommonModule,
        EvolutionRoutingModule,
        StoreModule.forFeature('evolution', evolutionReducers)
    ]
})
export class EvolutionModule {
}
