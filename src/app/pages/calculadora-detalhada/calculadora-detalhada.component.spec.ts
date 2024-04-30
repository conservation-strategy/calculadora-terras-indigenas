import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadoraDetalhadaComponent } from './calculadora-detalhada.component';

describe('CalculadoraDetalhadaComponent', () => {
  let component: CalculadoraDetalhadaComponent;
  let fixture: ComponentFixture<CalculadoraDetalhadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculadoraDetalhadaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalculadoraDetalhadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
