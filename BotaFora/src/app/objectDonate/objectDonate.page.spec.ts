import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectDonatePage } from './objectDonate.page';

describe('ObjectDonatePage', () => {
  let component: ObjectDonatePage;
  let fixture: ComponentFixture<ObjectDonatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectDonatePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectDonatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
