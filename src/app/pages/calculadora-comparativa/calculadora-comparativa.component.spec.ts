import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadoraComparativaComponent } from './calculadora-comparativa.component';

describe('CalculadoraComparativaComponent', () => {
  let component: CalculadoraComparativaComponent;
  let fixture: ComponentFixture<CalculadoraComparativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculadoraComparativaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalculadoraComparativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
