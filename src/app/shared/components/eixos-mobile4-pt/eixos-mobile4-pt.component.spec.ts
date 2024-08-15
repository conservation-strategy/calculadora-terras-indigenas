import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EixosMobile4PtComponent } from './eixos-mobile4-pt.component';

describe('EixosMobile4PtComponent', () => {
  let component: EixosMobile4PtComponent;
  let fixture: ComponentFixture<EixosMobile4PtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EixosMobile4PtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EixosMobile4PtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
