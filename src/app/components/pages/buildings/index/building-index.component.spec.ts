import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingIndexComponent } from './building-index.component';

describe('BuildingIndexComponent', () => {
  let component: BuildingIndexComponent;
  let fixture: ComponentFixture<BuildingIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildingIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildingIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
