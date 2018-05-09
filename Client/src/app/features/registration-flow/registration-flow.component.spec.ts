import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFlowComponent } from './registration-flow.component';

describe('RegistrationFlowComponent', () => {
  let component: RegistrationFlowComponent;
  let fixture: ComponentFixture<RegistrationFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
