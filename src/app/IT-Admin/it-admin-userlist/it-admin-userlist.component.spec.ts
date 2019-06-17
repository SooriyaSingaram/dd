import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItAdminUserlistComponent } from './it-admin-userlist.component';

describe('ItAdminUserlistComponent', () => {
  let component: ItAdminUserlistComponent;
  let fixture: ComponentFixture<ItAdminUserlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItAdminUserlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItAdminUserlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
