import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorBasicComponent } from './calculator-basic.component';

describe('CalculatorBasicComponent', () => {
  let component: CalculatorBasicComponent;
  let fixture: ComponentFixture<CalculatorBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorBasicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalculatorBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
