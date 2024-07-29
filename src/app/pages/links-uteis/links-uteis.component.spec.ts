import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksUteisComponent } from './links-uteis.component';

describe('LinksUteisComponent', () => {
  let component: LinksUteisComponent;
  let fixture: ComponentFixture<LinksUteisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinksUteisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LinksUteisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
