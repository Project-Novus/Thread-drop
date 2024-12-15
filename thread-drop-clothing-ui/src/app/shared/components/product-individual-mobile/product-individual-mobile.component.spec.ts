import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductIndividualMobileComponent } from './product-individual-mobile.component';

describe('ProductIndividualMobileComponent', () => {
  let component: ProductIndividualMobileComponent;
  let fixture: ComponentFixture<ProductIndividualMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductIndividualMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductIndividualMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
