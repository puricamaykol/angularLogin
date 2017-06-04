import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCbComponent } from './login-cb.component';

describe('LoginCbComponent', () => {
  let component: LoginCbComponent;
  let fixture: ComponentFixture<LoginCbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginCbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginCbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
