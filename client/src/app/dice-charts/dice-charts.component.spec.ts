import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceChartsComponent } from './dice-charts.component';

describe('DiceChartsComponent', () => {
  let component: DiceChartsComponent;
  let fixture: ComponentFixture<DiceChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiceChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiceChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
