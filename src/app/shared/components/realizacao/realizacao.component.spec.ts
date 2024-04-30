import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizacaoComponent } from './realizacao.component';

describe('RealizacaoComponent', () => {
  let component: RealizacaoComponent;
  let fixture: ComponentFixture<RealizacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealizacaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RealizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
