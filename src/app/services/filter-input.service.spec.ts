import { TestBed } from '@angular/core/testing';

import { FilterInputService } from './filter-input.service';

describe('FilterInputService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilterInputService = TestBed.inject(FilterInputService);
    expect(service).toBeTruthy();
  });
});
