import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EixosMobile2EsComponent } from './eixos-mobile2-es.component';

describe('EixosMobile2EsComponent', () => {
  let component: EixosMobile2EsComponent;
  let fixture: ComponentFixture<EixosMobile2EsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EixosMobile2EsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EixosMobile2EsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
