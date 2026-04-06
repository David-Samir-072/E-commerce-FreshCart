import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingFeaturesComponent } from './shipping-features.component';

describe('ShippingFeaturesComponent', () => {
  let component: ShippingFeaturesComponent;
  let fixture: ComponentFixture<ShippingFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingFeaturesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShippingFeaturesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
