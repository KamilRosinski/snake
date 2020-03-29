import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SnakeSettingsComponent} from './components/snake-settings/snake-settings.component';
import {SnakeComponent} from './components/snake/snake.component';

const routes: Routes = [
    {path: 'settings', component: SnakeSettingsComponent},
    {path: 'play', component: SnakeComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GameRoutingModule {
}
