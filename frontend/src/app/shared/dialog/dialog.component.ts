import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-dialog',
  imports: [
    CommonModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatButton
  ],
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
