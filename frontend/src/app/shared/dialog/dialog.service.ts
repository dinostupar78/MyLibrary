import { Injectable } from '@angular/core';
import {DialogComponent} from './dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  confirm(message: string) {
    return this.dialog.open(DialogComponent, {
      data: {
        title: 'Confirm',
        message,
        type: 'confirm'
      }
    }).afterClosed();
  }

  success(message: string) {
    this.dialog.open(DialogComponent, {
      data: {
        title: 'Success',
        message,
        type: 'success'
      }
    });
  }

  error(message: string) {
    this.dialog.open(DialogComponent, {
      data: {
        title: 'Error',
        message,
        type: 'error'
      }
    });
  }

}
