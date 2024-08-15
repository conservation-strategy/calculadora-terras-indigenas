import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EixosIlustracaoCompletaPtComponent } from './eixos-ilustracao-completa-pt.component';

describe('EixosIlustracaoCompletaPtComponent', () => {
  let component: EixosIlustracaoCompletaPtComponent;
  let fixture: ComponentFixture<EixosIlustracaoCompletaPtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EixosIlustracaoCompletaPtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EixosIlustracaoCompletaPtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
