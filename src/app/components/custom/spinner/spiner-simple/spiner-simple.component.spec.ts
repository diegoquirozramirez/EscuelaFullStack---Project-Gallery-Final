import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinerSimpleComponent } from './spiner-simple.component';

describe('SpinerSimpleComponent', () => {
  let component: SpinerSimpleComponent;
  let fixture: ComponentFixture<SpinerSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinerSimpleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinerSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
