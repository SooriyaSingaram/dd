import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItHeaderComponent } from './it-header.component';

describe('ItHeaderComponent', () => {
  let component: ItHeaderComponent;
  let fixture: ComponentFixture<ItHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
