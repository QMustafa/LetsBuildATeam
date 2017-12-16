import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPersonalityComponent } from './select-personality.component';

describe('SelectPersonalityComponent', () => {
  let component: SelectPersonalityComponent;
  let fixture: ComponentFixture<SelectPersonalityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPersonalityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPersonalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
