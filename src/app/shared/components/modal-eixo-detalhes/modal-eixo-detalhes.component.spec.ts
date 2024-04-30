import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEixoDetalhesComponent } from './modal-eixo-detalhes.component';

describe('ModalEixoDetalhesComponent', () => {
  let component: ModalEixoDetalhesComponent;
  let fixture: ComponentFixture<ModalEixoDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEixoDetalhesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalEixoDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
