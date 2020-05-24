import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialProjectListComponent } from './social-project-list.component';

describe('SocialProjectListComponent', () => {
  let component: SocialProjectListComponent;
  let fixture: ComponentFixture<SocialProjectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialProjectListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
