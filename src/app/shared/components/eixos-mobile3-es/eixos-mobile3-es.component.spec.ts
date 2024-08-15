import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EixosMobile3EsComponent } from './eixos-mobile3-es.component';

describe('EixosMobile3EsComponent', () => {
  let component: EixosMobile3EsComponent;
  let fixture: ComponentFixture<EixosMobile3EsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EixosMobile3EsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EixosMobile3EsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
