import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProgressBarComponent} from './progress-bar.component';

describe('ProgressBarComponent', () => {

    let component: ProgressBarComponent;
    let fixture: ComponentFixture<ProgressBarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProgressBarComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProgressBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create bar of class \'info\' for high value', () => {

        // given
        component.value = 0.8;

        // when
        const barClass = component.barClass;

        // then
        expect(barClass).toEqual('info');
    });

    it('should create bar of class \'warning\' for low value', () => {

        // given
        component.value = 0.2;

        // when
        const barClass = component.barClass;

        // then
        expect(barClass).toEqual('warning');
    });

});
