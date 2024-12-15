import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductIndividualDesktopComponent } from './product-individual-desktop.component';

describe('ProductIndividualDesktopComponent', () => {
  let component: ProductIndividualDesktopComponent;
  let fixture: ComponentFixture<ProductIndividualDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductIndividualDesktopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductIndividualDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
