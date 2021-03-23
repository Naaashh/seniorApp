import {TestBed} from '@angular/core/testing';

import {AddEditModalService} from './add-edit-modal.service';

describe('AddEditModalService', () => {
  let service: AddEditModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddEditModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
