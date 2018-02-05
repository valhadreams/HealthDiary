import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyAnalysisComponent } from './body-analysis.component';

describe('BodyAnalysisComponent', () => {
  let component: BodyAnalysisComponent;
  let fixture: ComponentFixture<BodyAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
