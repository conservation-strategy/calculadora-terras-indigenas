import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EixosMobile1EnComponent } from './eixos-mobile1-en.component';

describe('EixosMobile1EnComponent', () => {
  let component: EixosMobile1EnComponent;
  let fixture: ComponentFixture<EixosMobile1EnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EixosMobile1EnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EixosMobile1EnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
