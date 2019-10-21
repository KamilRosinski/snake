import * as Hammer from 'hammerjs';
import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SnakeComponent} from './snake/snake.component';
import {MessagesComponent} from './messages/messages.component';
import { SnakeFormatterPipe } from './snake/pipe/snake-formatter.pipe';

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
        SnakeFormatterPipe
    ],
    imports: [
        BrowserModule
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
