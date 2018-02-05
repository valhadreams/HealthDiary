import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyInfoAnalysisComponent } from './body-info-analysis.component';

describe('BodyInfoAnalysisComponent', () => {
  let component: BodyInfoAnalysisComponent;
  let fixture: ComponentFixture<BodyInfoAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyInfoAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyInfoAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
