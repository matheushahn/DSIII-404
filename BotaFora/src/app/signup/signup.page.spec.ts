import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { signupPage } from './signup.page';

describe('signupPage', () => {
  let component: signupPage;
  let fixture: ComponentFixture<signupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ signupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(signupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
