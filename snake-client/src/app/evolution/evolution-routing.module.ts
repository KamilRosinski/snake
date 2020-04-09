import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EvolutionListComponent} from './components/evolution-list/evolution-list.component';
import {EvolutionComponent} from './components/evolution/evolution.component';

const routes: Routes = [
    {path: 'list', component: EvolutionListComponent},
    {path: ':id', component: EvolutionComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EvolutionRoutingModule {
}
