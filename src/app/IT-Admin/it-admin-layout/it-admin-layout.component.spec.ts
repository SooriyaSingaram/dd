import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItAdminLayoutComponent } from './it-admin-layout.component';

describe('ItAdminLayoutComponent', () => {
  let component: ItAdminLayoutComponent;
  let fixture: ComponentFixture<ItAdminLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItAdminLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItAdminLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
