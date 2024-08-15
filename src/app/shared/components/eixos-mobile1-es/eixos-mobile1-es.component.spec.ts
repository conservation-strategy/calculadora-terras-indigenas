import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EixosMobile1EsComponent } from './eixos-mobile1-es.component';

describe('EixosMobile1EsComponent', () => {
  let component: EixosMobile1EsComponent;
  let fixture: ComponentFixture<EixosMobile1EsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EixosMobile1EsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EixosMobile1EsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
