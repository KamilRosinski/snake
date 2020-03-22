import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SnakeComponent} from './game/components/snake/snake.component';
import {MessagesComponent} from './components/messages/messages.component';
import {MainMenuComponent} from './components/main-menu/main-menu.component';
import {EvolutionListComponent} from './components/evolution-list/evolution-list.component';
import {SnakeSettingsComponent} from './game/components/snake-settings/snake-settings.component';

const routes: Routes = [
    {path: '', component: MainMenuComponent},
    {path: 'messages', component: MessagesComponent},
    {path: 'evolutions', component: EvolutionListComponent},
    {path: 'game', loadChildren: () => import('./game/game.module').then(m => m.GameModule)}
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
