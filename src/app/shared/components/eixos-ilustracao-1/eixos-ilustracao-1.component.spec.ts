import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EixosIlustracao1Component } from './eixos-ilustracao-1.component';

describe('EixosIlustracao1Component', () => {
  let component: EixosIlustracao1Component;
  let fixture: ComponentFixture<EixosIlustracao1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EixosIlustracao1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EixosIlustracao1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
