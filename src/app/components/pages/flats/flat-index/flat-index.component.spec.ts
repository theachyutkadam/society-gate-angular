import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatIndexComponent } from './flat-index.component';

describe('FlatIndexComponent', () => {
  let component: FlatIndexComponent;
  let fixture: ComponentFixture<FlatIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlatIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlatIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
