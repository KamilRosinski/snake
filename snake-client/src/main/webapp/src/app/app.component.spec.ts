import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {SnakeComponent} from "./snake/snake.component";
import {MessagesComponent} from "./messages/messages.component";

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                SnakeComponent,
                MessagesComponent
            ],
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

});
