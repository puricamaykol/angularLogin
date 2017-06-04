import { TestBed, inject } from '@angular/core/testing';

import { GoogleOauthService } from './google-oauth.service';

describe('GoogleOauthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleOauthService]
    });
  });

  it('should ...', inject([GoogleOauthService], (service: GoogleOauthService) => {
    expect(service).toBeTruthy();
  }));
});
