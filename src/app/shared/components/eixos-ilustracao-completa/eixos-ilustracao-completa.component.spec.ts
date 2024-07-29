import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EixosIlustracaoCompletaComponent } from './eixos-ilustracao-completa.component';

describe('EixosIlustracaoCompletaComponent', () => {
  let component: EixosIlustracaoCompletaComponent;
  let fixture: ComponentFixture<EixosIlustracaoCompletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EixosIlustracaoCompletaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EixosIlustracaoCompletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
