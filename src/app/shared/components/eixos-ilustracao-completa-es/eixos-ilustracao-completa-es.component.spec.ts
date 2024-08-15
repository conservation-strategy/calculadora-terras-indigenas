import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EixosIlustracaoCompletaEsComponent } from './eixos-ilustracao-completa-es.component';

describe('EixosIlustracaoCompletaEsComponent', () => {
  let component: EixosIlustracaoCompletaEsComponent;
  let fixture: ComponentFixture<EixosIlustracaoCompletaEsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EixosIlustracaoCompletaEsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EixosIlustracaoCompletaEsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
