import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EixosIlustracao2Component } from './eixos-ilustracao-2.component';

describe('EixosIlustracao2Component', () => {
  let component: EixosIlustracao2Component;
  let fixture: ComponentFixture<EixosIlustracao2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EixosIlustracao2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EixosIlustracao2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
