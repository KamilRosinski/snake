import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainMenuComponent} from './shared/components/main-menu/main-menu.component';

const routes: Routes = [
    {path: '', component: MainMenuComponent},
    {path: 'game', loadChildren: () => import('./game/game.module').then(m => m.GameModule)},
    {path: 'evolution', loadChildren: () => import('./evolution/evolution.module').then(m => m.EvolutionModule)}
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
