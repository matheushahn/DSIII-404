import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyObjectsPage } from './myObjects.page';

describe('MyObjectsPage', () => {
  let component: MyObjectsPage;
  let fixture: ComponentFixture<MyObjectsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyObjectsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyObjectsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
