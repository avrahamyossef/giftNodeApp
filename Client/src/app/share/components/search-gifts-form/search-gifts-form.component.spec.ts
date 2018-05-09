import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchGiftsFormComponent } from './search-gifts-form.component';

describe('SearchGiftsFormComponent', () => {
  let component: SearchGiftsFormComponent;
  let fixture: ComponentFixture<SearchGiftsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchGiftsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchGiftsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
