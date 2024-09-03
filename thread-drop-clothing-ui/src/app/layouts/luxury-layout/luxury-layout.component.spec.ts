import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuxuryLayoutComponent } from './luxury-layout.component';

describe('LuxuryLayoutComponent', () => {
  let component: LuxuryLayoutComponent;
  let fixture: ComponentFixture<LuxuryLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuxuryLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LuxuryLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
