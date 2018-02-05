import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseAnalysisComponent } from './exercise-analysis.component';

describe('ExerciseAnalysisComponent', () => {
  let component: ExerciseAnalysisComponent;
  let fixture: ComponentFixture<ExerciseAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
