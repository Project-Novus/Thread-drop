import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureLayoutComponent } from './signature-layout.component';

describe('SignatureLayoutComponent', () => {
  let component: SignatureLayoutComponent;
  let fixture: ComponentFixture<SignatureLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignatureLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignatureLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
