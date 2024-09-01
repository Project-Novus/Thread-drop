import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EssentialsLayoutComponent } from './essentials-layout.component';

describe('EssentialsLayoutComponent', () => {
  let component: EssentialsLayoutComponent;
  let fixture: ComponentFixture<EssentialsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EssentialsLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EssentialsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
