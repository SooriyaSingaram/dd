import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItAddUserComponent } from './it-add-user.component';

describe('ItAddUserComponent', () => {
  let component: ItAddUserComponent;
  let fixture: ComponentFixture<ItAddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItAddUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
