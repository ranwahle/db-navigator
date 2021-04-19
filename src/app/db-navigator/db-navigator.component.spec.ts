import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DBNavigatorComponent } from './db-navigator.component';

describe('DBNavigatorComponent', () => {
  let component: DBNavigatorComponent;
  let fixture: ComponentFixture<DBNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DBNavigatorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DBNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
