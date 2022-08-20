import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleTagsComponent } from './multiple-tags.component';

describe('MultipleTagsComponent', () => {
  let component: MultipleTagsComponent;
  let fixture: ComponentFixture<MultipleTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleTagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
