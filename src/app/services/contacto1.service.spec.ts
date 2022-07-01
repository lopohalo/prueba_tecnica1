import { TestBed } from '@angular/core/testing';

import { Contacto1Service } from './contacto1.service';

describe('Contacto1Service', () => {
  let service: Contacto1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Contacto1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
