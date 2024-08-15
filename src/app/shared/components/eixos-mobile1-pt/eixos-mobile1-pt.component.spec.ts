import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EixosMobile1PtComponent } from './eixos-mobile1-pt.component';

describe('EixosMobile1PtComponent', () => {
  let component: EixosMobile1PtComponent;
  let fixture: ComponentFixture<EixosMobile1PtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EixosMobile1PtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EixosMobile1PtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
