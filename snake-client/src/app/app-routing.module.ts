import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SnakeComponent} from './components/snake/snake.component';
import {MessagesComponent} from './components/messages/messages.component';
import {MainMenuComponent} from './components/main-menu/main-menu.component';
import {EvolutionListComponent} from './components/evolution-list/evolution-list.component';
import {SnakeSettingsComponent} from './components/snake-settings/snake-settings.component';

const routes: Routes = [
  {path: '', component: MainMenuComponent},
  {path: 'snake/settings', component: SnakeSettingsComponent},
  {path: 'snake/game', component: SnakeComponent},
  {path: 'messages', component: MessagesComponent},
  {path: 'evolutions', component: EvolutionListComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
