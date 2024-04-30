import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEixoSelecaoComponent } from './modal-eixo-selecao.component';

describe('ModalEixoSelecaoComponent', () => {
  let component: ModalEixoSelecaoComponent;
  let fixture: ComponentFixture<ModalEixoSelecaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEixoSelecaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalEixoSelecaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
