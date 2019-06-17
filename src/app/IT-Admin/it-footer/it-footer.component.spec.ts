import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItFooterComponent } from './it-footer.component';

describe('ItFooterComponent', () => {
  let component: ItFooterComponent;
  let fixture: ComponentFixture<ItFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
