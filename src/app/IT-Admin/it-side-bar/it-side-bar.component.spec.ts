import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItSideBarComponent } from './it-side-bar.component';

describe('ItSideBarComponent', () => {
  let component: ItSideBarComponent;
  let fixture: ComponentFixture<ItSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
