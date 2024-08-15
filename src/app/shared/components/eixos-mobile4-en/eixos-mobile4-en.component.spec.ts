import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EixosMobile4EnComponent } from './eixos-mobile4-en.component';

describe('EixosMobile4EnComponent', () => {
  let component: EixosMobile4EnComponent;
  let fixture: ComponentFixture<EixosMobile4EnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EixosMobile4EnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EixosMobile4EnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
