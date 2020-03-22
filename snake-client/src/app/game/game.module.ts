import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GameRoutingModule} from './game-routing.module';
import {GameComponent} from './game.component';
import {SnakeComponent} from './components/snake/snake.component';
import {SnakeSettingsComponent} from './components/snake-settings/snake-settings.component';
import {ProgressBarComponent} from './components/progress-bar/progress-bar.component';
import {SnakeFormatterPipe} from './pipes/snake-formatter.pipe';
import {DimensionsFormatterPipe} from './pipes/dimensions-formatter.pipe';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        GameComponent,
        SnakeComponent,
        SnakeSettingsComponent,
        ProgressBarComponent,
        SnakeFormatterPipe,
        DimensionsFormatterPipe,

    ],
    imports: [
        CommonModule,
        GameRoutingModule,
        ReactiveFormsModule
    ]
})
export class GameModule {
}
