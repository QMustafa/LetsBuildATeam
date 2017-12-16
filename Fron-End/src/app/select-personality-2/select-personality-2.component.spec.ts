import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPersonality2Component } from './select-personality-2.component';

describe('SelectPersonality2Component', () => {
  let component: SelectPersonality2Component;
  let fixture: ComponentFixture<SelectPersonality2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPersonality2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPersonality2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
