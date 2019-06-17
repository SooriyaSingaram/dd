import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizedTemplateComponent } from './custom-template.component';

describe('CustomizedTemplateComponent', () => {
  let component: CustomizedTemplateComponent;
  let fixture: ComponentFixture<CustomizedTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomizedTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizedTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
