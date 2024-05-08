import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadoraSimplificadaComponent } from './calculadora-simplificada.component';

describe('CalculadoraSimplificadaComponent', () => {
  let component: CalculadoraSimplificadaComponent;
  let fixture: ComponentFixture<CalculadoraSimplificadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculadoraSimplificadaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalculadoraSimplificadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
