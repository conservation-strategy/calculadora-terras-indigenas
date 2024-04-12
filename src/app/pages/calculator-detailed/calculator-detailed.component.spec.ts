import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorDetailedComponent } from './calculator-detailed.component';

describe('CalculatorDetailedComponent', () => {
  let component: CalculatorDetailedComponent;
  let fixture: ComponentFixture<CalculatorDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorDetailedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalculatorDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
