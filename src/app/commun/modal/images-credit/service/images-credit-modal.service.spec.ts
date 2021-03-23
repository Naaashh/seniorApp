import {TestBed} from '@angular/core/testing';

import {ImagesCreditModalService} from './images-credit-modal.service';

describe('ImagesCreditModalService', () => {
  let service: ImagesCreditModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagesCreditModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
