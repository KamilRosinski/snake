import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionListComponent } from './evolution-list.component';

describe('EvolutionListComponent', () => {
  let component: EvolutionListComponent;
  let fixture: ComponentFixture<EvolutionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvolutionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvolutionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
