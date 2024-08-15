import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EixosMobile2PtComponent } from './eixos-mobile2-pt.component';

describe('EixosMobile2PtComponent', () => {
  let component: EixosMobile2PtComponent;
  let fixture: ComponentFixture<EixosMobile2PtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EixosMobile2PtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EixosMobile2PtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
