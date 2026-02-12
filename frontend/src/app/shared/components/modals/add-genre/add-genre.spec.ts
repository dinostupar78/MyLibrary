import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGenre } from './add-genre';

describe('AddGenre', () => {
  let component: AddGenre;
  let fixture: ComponentFixture<AddGenre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGenre]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGenre);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
