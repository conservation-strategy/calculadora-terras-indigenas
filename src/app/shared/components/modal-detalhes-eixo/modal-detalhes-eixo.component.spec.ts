import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalhesEixoComponent } from './modal-detalhes-eixo.component';

describe('ModalDetalhesEixoComponent', () => {
  let component: ModalDetalhesEixoComponent;
  let fixture: ComponentFixture<ModalDetalhesEixoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDetalhesEixoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalDetalhesEixoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
