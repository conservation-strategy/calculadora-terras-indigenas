import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EixosIlustracao3Component } from './eixos-ilustracao-3.component';

describe('EixosIlustracao3Component', () => {
  let component: EixosIlustracao3Component;
  let fixture: ComponentFixture<EixosIlustracao3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EixosIlustracao3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EixosIlustracao3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
