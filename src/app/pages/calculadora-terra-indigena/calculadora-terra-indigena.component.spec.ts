import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadoraTerraIndigenaComponent } from './calculadora-terra-indigena.component';

describe('CalculadoraTerraIndigenaComponent', () => {
  let component: CalculadoraTerraIndigenaComponent;
  let fixture: ComponentFixture<CalculadoraTerraIndigenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculadoraTerraIndigenaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalculadoraTerraIndigenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
