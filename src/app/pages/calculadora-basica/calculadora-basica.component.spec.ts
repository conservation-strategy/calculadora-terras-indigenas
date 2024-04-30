import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadoraBasicaComponent } from './calculadora-basica.component';

describe('CalculadoraBasicaComponent', () => {
  let component: CalculadoraBasicaComponent;
  let fixture: ComponentFixture<CalculadoraBasicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculadoraBasicaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalculadoraBasicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
