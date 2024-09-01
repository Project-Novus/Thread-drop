import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliteLayoutComponent } from './elite-layout.component';

describe('EliteLayoutComponent', () => {
  let component: EliteLayoutComponent;
  let fixture: ComponentFixture<EliteLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliteLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliteLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
