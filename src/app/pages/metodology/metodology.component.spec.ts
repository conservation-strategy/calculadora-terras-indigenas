import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodologyComponent } from './metodology.component';

describe('MetodologyComponent', () => {
  let component: MetodologyComponent;
  let fixture: ComponentFixture<MetodologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetodologyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MetodologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
