import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookStatus'

})
export class BookStatusPipe implements PipeTransform {

  transform(status: string, isOverdue: boolean = false): string {

    if (!status)
      return '';

    if (status === 'borrowed' && isOverdue) {
      return 'Overdue';
    }

    return status.charAt(0).toUpperCase() + status.slice(1);
  }
}
