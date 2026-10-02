import { TestBed } from '@angular/core/testing';
import { LiveStatus } from './live-status';

describe('LiveStatus', () => {
  let service: LiveStatus;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveStatus);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
