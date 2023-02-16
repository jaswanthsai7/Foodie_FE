import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdaterestaurantComponent } from './updaterestaurant.component';

describe('UpdaterestaurantComponent', () => {
  let component: UpdaterestaurantComponent;
  let fixture: ComponentFixture<UpdaterestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdaterestaurantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdaterestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
