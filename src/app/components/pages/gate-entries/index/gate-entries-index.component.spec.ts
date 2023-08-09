import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateEntriesIndexComponent } from './gate-entries-index.component';

describe('GateEntriesIndexComponent', () => {
  let component: GateEntriesIndexComponent;
  let fixture: ComponentFixture<GateEntriesIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GateEntriesIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GateEntriesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
