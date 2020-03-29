import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessagesComponent} from './components/messages/messages.component';
import {MainMenuComponent} from './components/main-menu/main-menu.component';
import {SharedRoutingModule} from './shared-routing.module';


@NgModule({
    declarations: [
        MainMenuComponent,
        MessagesComponent
    ],
    imports: [
        CommonModule,
        SharedRoutingModule
    ]
})
export class SharedModule {
}
