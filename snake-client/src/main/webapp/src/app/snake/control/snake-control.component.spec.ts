import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeControlComponent } from './snake-control.component';

describe('SnakeControlComponent', () => {
  let component: SnakeControlComponent;
  let fixture: ComponentFixture<SnakeControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnakeControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnakeControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
