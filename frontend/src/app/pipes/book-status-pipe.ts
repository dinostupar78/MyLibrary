import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookStatus'
})
export class BookStatusPipe implements PipeTransform {

  transform(value: string): string{
    if (!value)
      return '';

    switch (value) {
      case 'borrowed':
        return 'Borrowed';
      case 'available':
        return 'Available';
      default:
        return value;
    }
  }

}
