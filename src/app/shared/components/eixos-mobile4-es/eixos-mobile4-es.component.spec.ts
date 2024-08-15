import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EixosMobile4EsComponent } from './eixos-mobile4-es.component';

describe('EixosMobile4EsComponent', () => {
  let component: EixosMobile4EsComponent;
  let fixture: ComponentFixture<EixosMobile4EsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EixosMobile4EsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EixosMobile4EsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
