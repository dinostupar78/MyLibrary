import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-dialogs',
  imports: [
    CommonModule,],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:
    { title: string; message: string; type: 'confirm' | 'success' | 'error'; }) {}

  close(result: boolean) {
    this.dialogRef.close(result);
  }

}
