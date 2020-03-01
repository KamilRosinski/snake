import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SnakeComponent} from './snake.component';
import {FormsModule} from "@angular/forms";
import {DimensionsFormatterPipe} from "./pipe/dimensions-formatter.pipe";
import {SnakeFormatterPipe} from "./pipe/snake-formatter.pipe";

describe('SnakeComponent', () => {
    let component: SnakeComponent;
    let fixture: ComponentFixture<SnakeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SnakeComponent,
                DimensionsFormatterPipe,
                SnakeFormatterPipe
            ],
            imports: [
                FormsModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SnakeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
