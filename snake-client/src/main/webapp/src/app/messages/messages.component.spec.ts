import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MessagesComponent} from './messages.component';
import {SortOrder} from "./sort-order";
import {MessagingService} from "./messaging.service";

describe('MessagesComponent', () => {

    let component: MessagesComponent;
    let fixture: ComponentFixture<MessagesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MessagesComponent],
            providers: [MessagingService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MessagesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set initial values', () => {
        expect(component.order).toBe(SortOrder.ASCENDING);
        expect(component.hasMessages()).toBe(false);
    });

});
