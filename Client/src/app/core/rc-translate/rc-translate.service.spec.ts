import { TestBed, inject } from '@angular/core/testing';

import { RcTranslateService } from './rc-translate.service';

describe('RcTranslateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RcTranslateService]
    });
  });

  it('should be created', inject([RcTranslateService], (service: RcTranslateService) => {
    expect(service).toBeTruthy();
  }));
});
