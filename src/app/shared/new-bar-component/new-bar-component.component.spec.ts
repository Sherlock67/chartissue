import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBarComponentComponent } from './new-bar-component.component';

describe('NewBarComponentComponent', () => {
  let component: NewBarComponentComponent;
  let fixture: ComponentFixture<NewBarComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBarComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewBarComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
