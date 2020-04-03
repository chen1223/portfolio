import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CssWorksComponent } from './css-works.component';

describe('CssWorksComponent', () => {
  let component: CssWorksComponent;
  let fixture: ComponentFixture<CssWorksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CssWorksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CssWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
