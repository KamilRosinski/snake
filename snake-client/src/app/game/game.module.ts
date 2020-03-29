import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GameRoutingModule} from './game-routing.module';
import {SnakeComponent} from './components/snake/snake.component';
import {SnakeSettingsComponent} from './components/snake-settings/snake-settings.component';
import {ProgressBarComponent} from './components/progress-bar/progress-bar.component';
import {SnakeFormatterPipe} from './pipes/snake-formatter.pipe';
import {DimensionsFormatterPipe} from './pipes/dimensions-formatter.pipe';
import {ReactiveFormsModule} from '@angular/forms';
import {ControlsComponent} from './components/controls/controls.component';
import {StoreModule} from '@ngrx/store';
import {gameReducers} from './store/game.reducers';


@NgModule({
    declarations: [
        SnakeComponent,
        SnakeSettingsComponent,
        ProgressBarComponent,
        SnakeFormatterPipe,
        DimensionsFormatterPipe,
        ControlsComponent,

    ],
    imports: [
        CommonModule,
        GameRoutingModule,
        ReactiveFormsModule,
        StoreModule.forFeature('game', gameReducers)
    ]
})
export class GameModule {
}
