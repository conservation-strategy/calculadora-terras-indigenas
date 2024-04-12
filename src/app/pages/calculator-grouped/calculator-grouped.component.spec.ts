import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorGroupedComponent } from './calculator-grouped.component';

describe('CalculatorGroupedComponent', () => {
  let component: CalculatorGroupedComponent;
  let fixture: ComponentFixture<CalculatorGroupedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorGroupedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalculatorGroupedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
