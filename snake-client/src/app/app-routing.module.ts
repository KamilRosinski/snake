import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SnakeComponent} from './snake/snake.component';
import {MessagesComponent} from './messages/messages.component';

const routes: Routes = [
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
