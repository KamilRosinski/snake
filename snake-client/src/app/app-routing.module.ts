import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SnakeComponent} from './snake/snake.component';
import {MessagesComponent} from './messages/messages.component';
import {MainMenuComponent} from './main-menu/main-menu.component';

const routes: Routes = [
  {path: '', component: MainMenuComponent},
  {path: 'snake', component: SnakeComponent},
  {path: 'messages', component: MessagesComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
