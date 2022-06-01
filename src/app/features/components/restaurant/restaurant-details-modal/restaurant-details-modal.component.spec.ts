import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantDetailsModalComponent } from './restaurant-details-modal.component';

describe('RestaurantDetailsModalComponent', () => {
  let component: RestaurantDetailsModalComponent;
  let fixture: ComponentFixture<RestaurantDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantDetailsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
