import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MessagesComponent} from './messages.component';
import {SortOrder} from "./sort-order";
import {MessagingService} from "./service/messaging.service";
import {Subject} from "rxjs";
import {Message} from "./message";

describe('MessagesComponent', () => {

    let messagingService: MessagingService;
    let component: MessagesComponent;
    let fixture: ComponentFixture<MessagesComponent>;
    let messenger: Subject<Message>;

    const sendMessages = (...messages: Message[]): void => {
        messages.forEach(message => messenger.next(message));
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MessagesComponent],
            providers: [MessagingService]
        }).compileComponents();
    }));

    beforeEach(() => {
        messagingService = TestBed.get(MessagingService);
        messenger = new Subject<Message>();
        spyOn(messagingService, 'getMessenger').and.returnValue(messenger.asObservable());
        fixture = TestBed.createComponent(MessagesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component.isSortedAscending()).toBe(false);
        expect(component.hasMessages()).toBe(false);
    });

    it('should display received message', () => {

        // given
        const message: Message = {timestamp: new Date(0), body: 'test'};

        // when
        sendMessages(message);

        // then
        expect(component.sortedMessages.map(m => m.body)).toEqual(['test']);
    });

    it('should sort multiple messages in ascending order', () => {

        // given
        sendMessages({timestamp: new Date(0), body: 'm1'},
            {timestamp: new Date(1), body: 'm2'},
            {timestamp: new Date(2), body: 'm3'});

        component.toggleSortOrder();


        // when
        const sortedMessages: Message[] = component.sortedMessages;

        // then
        expect(component.isSortedAscending()).toBe(true);
        expect(sortedMessages.map(m => m.body)).toEqual(['m1', 'm2', 'm3']);
    });

    it('should sort multiple messages in descending order', () => {

        // given
        sendMessages({timestamp: new Date(0), body: 'm1'},
            {timestamp: new Date(1), body: 'm2'},
            {timestamp: new Date(2), body: 'm3'});

        // when
        const sortedMessages: Message[] = component.sortedMessages;

        // then
        expect(component.isSortedAscending()).toBe(false);
        expect(sortedMessages.map(m => m.body)).toEqual(['m3', 'm2', 'm1']);
    });

});
