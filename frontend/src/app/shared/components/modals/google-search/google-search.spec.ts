import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleSearch } from './google-search';

describe('GoogleSearch', () => {
  let component: GoogleSearch;
  let fixture: ComponentFixture<GoogleSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
