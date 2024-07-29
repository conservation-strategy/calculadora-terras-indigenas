import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EixosIlustracao4Component } from './eixos-ilustracao-4.component';

describe('EixosIlustracao4Component', () => {
  let component: EixosIlustracao4Component;
  let fixture: ComponentFixture<EixosIlustracao4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EixosIlustracao4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EixosIlustracao4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
