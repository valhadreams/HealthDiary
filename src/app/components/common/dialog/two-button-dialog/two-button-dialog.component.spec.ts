import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoButtonDialogComponent } from './two-button-dialog.component';

describe('TwoButtonDialogComponent', () => {
  let component: TwoButtonDialogComponent;
  let fixture: ComponentFixture<TwoButtonDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoButtonDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoButtonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
