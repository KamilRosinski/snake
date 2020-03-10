import * as Hammer from 'hammerjs';
import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SnakeComponent} from './snake/snake.component';
import {MessagesComponent} from './messages/messages.component';
import {SnakeFormatterPipe} from './snake/pipe/snake-formatter.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DimensionsFormatterPipe} from './snake/pipe/dimensions-formatter.pipe';
import {SnakeControlComponent} from './snake/control/snake-control.component';
import {StoreModule} from '@ngrx/store';
import {appReducer} from './store/reducers/snake.reducer';
import {ReverseOrderPipe} from './messages/pipe/reverse-order.pipe';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {ProgressBarComponent} from './progress-bar/progress-bar.component';
import {AppRoutingModule} from './app-routing.module';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { EffectsModule } from '@ngrx/effects';
import {SnakeEffects} from './store/effects/snake.effects';

export class HammerConfig extends HammerGestureConfig {
    overrides = {
        'swipe': {direction: Hammer.DIRECTION_ALL}
    };
}

@NgModule({
    declarations: [
        AppComponent,
        SnakeComponent,
        MessagesComponent,
        SnakeFormatterPipe,
        DimensionsFormatterPipe,
        SnakeControlComponent,
        ReverseOrderPipe,
        ProgressBarComponent,
        MainMenuComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({app: appReducer}, {
            runtimeChecks: {
                strictStateImmutability: true,
                strictStateSerializability: true,
                strictActionImmutability: true,
                strictActionSerializability: true
            }
        }),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production
        }),
        AppRoutingModule,
        EffectsModule.forRoot([SnakeEffects])
    ],
    providers: [
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: HammerConfig
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
