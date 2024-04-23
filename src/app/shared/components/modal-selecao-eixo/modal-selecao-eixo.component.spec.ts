import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelecaoEixoComponent } from './modal-selecao-eixo.component';

describe('ModalSelecaoEixoComponent', () => {
  let component: ModalSelecaoEixoComponent;
  let fixture: ComponentFixture<ModalSelecaoEixoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalSelecaoEixoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalSelecaoEixoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
