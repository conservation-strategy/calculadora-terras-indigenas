import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormDetalhesComponent } from './modal-form-detalhes.component';

describe('ModalFormDetalhesComponent', () => {
  let component: ModalFormDetalhesComponent;
  let fixture: ComponentFixture<ModalFormDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalFormDetalhesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalFormDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
