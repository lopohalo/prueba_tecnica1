import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarfijaComponent } from './navbarfija.component';

describe('NavbarfijaComponent', () => {
  let component: NavbarfijaComponent;
  let fixture: ComponentFixture<NavbarfijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarfijaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarfijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
