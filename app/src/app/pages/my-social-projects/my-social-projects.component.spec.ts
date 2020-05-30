import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySocialProjectsComponent } from './my-social-projects.component';

describe('MySocialProjectsComponent', () => {
  let component: MySocialProjectsComponent;
  let fixture: ComponentFixture<MySocialProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySocialProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySocialProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
