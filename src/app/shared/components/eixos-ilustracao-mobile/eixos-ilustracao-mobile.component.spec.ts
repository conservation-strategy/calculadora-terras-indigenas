import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EixosIlustracaoMobileComponent } from './eixos-ilustracao-mobile.component';

describe('EixosIlustracaoMobileComponent', () => {
  let component: EixosIlustracaoMobileComponent;
  let fixture: ComponentFixture<EixosIlustracaoMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EixosIlustracaoMobileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EixosIlustracaoMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
