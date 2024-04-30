import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadoraAgrupadaComponent } from './calculadora-agrupada.component';

describe('CalculadoraAgrupadaComponent', () => {
  let component: CalculadoraAgrupadaComponent;
  let fixture: ComponentFixture<CalculadoraAgrupadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculadoraAgrupadaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalculadoraAgrupadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
