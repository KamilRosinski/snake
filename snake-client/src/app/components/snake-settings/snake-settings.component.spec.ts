import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeSettingsComponent } from './snake-settings.component';

describe('SnakeSettingsComponent', () => {
  let component: SnakeSettingsComponent;
  let fixture: ComponentFixture<SnakeSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnakeSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnakeSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
