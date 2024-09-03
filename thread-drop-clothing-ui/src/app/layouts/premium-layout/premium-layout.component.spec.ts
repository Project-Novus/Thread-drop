import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumLayoutComponent } from './premium-layout.component';

describe('PremiumLayoutComponent', () => {
  let component: PremiumLayoutComponent;
  let fixture: ComponentFixture<PremiumLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PremiumLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PremiumLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
