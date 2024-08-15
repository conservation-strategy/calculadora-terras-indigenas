import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EixosMobile3PtComponent } from './eixos-mobile3-pt.component';

describe('EixosMobile3PtComponent', () => {
  let component: EixosMobile3PtComponent;
  let fixture: ComponentFixture<EixosMobile3PtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EixosMobile3PtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EixosMobile3PtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
