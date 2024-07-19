import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgtasComponent } from './pgtas.component';

describe('PgtasComponent', () => {
  let component: PgtasComponent;
  let fixture: ComponentFixture<PgtasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PgtasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PgtasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
