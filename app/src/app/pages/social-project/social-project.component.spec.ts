import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialProjectComponent } from './social-project.component';

describe('SocialProjectComponent', () => {
  let component: SocialProjectComponent;
  let fixture: ComponentFixture<SocialProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
