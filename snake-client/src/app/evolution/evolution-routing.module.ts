import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EvolutionComponent} from './evolution.component';
import {EvolutionListComponent} from './components/evolution-list/evolution-list.component';

const routes: Routes = [
    {path: '', component: EvolutionComponent},
    {path: 'list', component: EvolutionListComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EvolutionRoutingModule {
}
