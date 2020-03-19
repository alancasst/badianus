import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialsAdminComponent } from './testimonials-admin.component';

describe('TestimonialsAdminComponent', () => {
  let component: TestimonialsAdminComponent;
  let fixture: ComponentFixture<TestimonialsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestimonialsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimonialsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
