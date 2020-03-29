import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MessagesComponent} from './components/messages/messages.component';
import {MainMenuComponent} from './components/main-menu/main-menu.component';

const routes: Routes = [
    {path: '', component: MainMenuComponent},
    {path: 'game', loadChildren: () => import('../game/game.module').then(m => m.GameModule)},
    {path: 'evolution', loadChildren: () => import('../evolution/evolution.module').then(m => m.EvolutionModule)},
    {path: 'messages', component: MessagesComponent}
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SharedRoutingModule {
}
