import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadoraListaComponent } from './calculadora-lista.component';

describe('CalculadoraListaComponent', () => {
  let component: CalculadoraListaComponent;
  let fixture: ComponentFixture<CalculadoraListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculadoraListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalculadoraListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
