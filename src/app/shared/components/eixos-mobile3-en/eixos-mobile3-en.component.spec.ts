import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EixosMobile3EnComponent } from './eixos-mobile3-en.component';

describe('EixosMobile3EnComponent', () => {
  let component: EixosMobile3EnComponent;
  let fixture: ComponentFixture<EixosMobile3EnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EixosMobile3EnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EixosMobile3EnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
