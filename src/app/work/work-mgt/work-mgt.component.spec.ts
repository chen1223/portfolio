import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkMgtComponent } from './work-mgt.component';

describe('WorkMgtComponent', () => {
  let component: WorkMgtComponent;
  let fixture: ComponentFixture<WorkMgtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkMgtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkMgtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
