import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {SnakeComponent} from "./game/components/snake/snake.component";
import {MessagesComponent} from "./components/messages/messages.component";
import {FormsModule} from "@angular/forms";
import {DimensionsFormatterPipe} from "./game/pipes/dimensions-formatter.pipe";
import {SnakeFormatterPipe} from "./game/pipes/snake-formatter.pipe";

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                SnakeComponent,
                MessagesComponent,
                DimensionsFormatterPipe,
                SnakeFormatterPipe
            ],
            imports: [
                FormsModule
            ]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

});
