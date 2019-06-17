import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittriggerComponent } from './edittrigger.component';

describe('EdittriggerComponent', () => {
  let component: EdittriggerComponent;
  let fixture: ComponentFixture<EdittriggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdittriggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
