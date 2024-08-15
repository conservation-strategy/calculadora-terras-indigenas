import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EixosIlustracaoCompletaEnComponent } from './eixos-ilustracao-completa-en.component';

describe('EixosIlustracaoCompletaEnComponent', () => {
  let component: EixosIlustracaoCompletaEnComponent;
  let fixture: ComponentFixture<EixosIlustracaoCompletaEnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EixosIlustracaoCompletaEnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EixosIlustracaoCompletaEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
