import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorListComponent } from './calculator-list.component';

describe('CalculatorListComponent', () => {
  let component: CalculatorListComponent;
  let fixture: ComponentFixture<CalculatorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalculatorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
