import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EixosMobile2EnComponent } from './eixos-mobile2-en.component';

describe('EixosMobile2EnComponent', () => {
  let component: EixosMobile2EnComponent;
  let fixture: ComponentFixture<EixosMobile2EnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EixosMobile2EnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EixosMobile2EnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
