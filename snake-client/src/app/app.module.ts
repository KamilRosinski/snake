import * as Hammer from 'hammerjs';
import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MessagesComponent} from './components/messages/messages.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {ReverseOrderPipe} from './pipes/reverse-order.pipe';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {MainMenuComponent} from './components/main-menu/main-menu.component';
import {EffectsModule} from '@ngrx/effects';
import {EvolutionEffects} from './evolution/store/evolution.effects';
import {evolutionReducers} from './evolution/store/evolution.reducers';
import {EvolutionListComponent} from './evolution/components/evolution-list/evolution-list.component';
import {HttpClientModule} from '@angular/common/http';

export class HammerConfig extends HammerGestureConfig {
    overrides = {
        'swipe': {direction: Hammer.DIRECTION_ALL}
    };
}

@NgModule({
    declarations: [
        AppComponent,
        MessagesComponent,
        ReverseOrderPipe,
        MainMenuComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({}, {
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
        EffectsModule.forRoot([EvolutionEffects])
    ],
    providers: [
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: HammerConfig
        }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
