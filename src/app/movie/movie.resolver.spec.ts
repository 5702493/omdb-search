import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MovieResolver } from './movie.resolver';

describe('MovieResolver', (): void => {
  let resolver: MovieResolver;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    resolver = TestBed.inject(MovieResolver);
  });

  it('should be created', (): void => {
    expect(resolver).toBeTruthy();
  });
});
