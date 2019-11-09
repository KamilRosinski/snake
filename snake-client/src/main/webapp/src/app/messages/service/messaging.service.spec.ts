import {TestBed} from '@angular/core/testing';

import {MessagingService} from './messaging.service';

describe('MessagingService', () => {

    let service: MessagingService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MessagingService]
        });
        service = TestBed.get(MessagingService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should send message', (done: DoneFn) => {

        // given
        const testMessage: string = 'Test message';

        service.getMessages().subscribe(message => {
            // then
            expect(message.body).toBe(testMessage);
            done();
        });

        // when
        service.sendMessage(testMessage);
    });

});
