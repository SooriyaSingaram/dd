import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Temp1Theme1Component } from './temp1-theme1.component';

describe('Temp1Theme1Component', () => {
  let component: Temp1Theme1Component;
  let fixture: ComponentFixture<Temp1Theme1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Temp1Theme1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Temp1Theme1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
