import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBorrowBook } from './app-borrow-book';

describe('AppBorrowBook', () => {
  let component: AppBorrowBook;
  let fixture: ComponentFixture<AppBorrowBook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppBorrowBook]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppBorrowBook);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
