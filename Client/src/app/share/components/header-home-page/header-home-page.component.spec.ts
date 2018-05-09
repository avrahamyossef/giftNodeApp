import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderHomePageComponent } from './header-home-page.component';

describe('HeaderHomePageComponent', () => {
  let component: HeaderHomePageComponent;
  let fixture: ComponentFixture<HeaderHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
