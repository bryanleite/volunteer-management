import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialProjectSearchComponent } from './social-project-search.component';

describe('SocialProjectSearchComponent', () => {
  let component: SocialProjectSearchComponent;
  let fixture: ComponentFixture<SocialProjectSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialProjectSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialProjectSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
