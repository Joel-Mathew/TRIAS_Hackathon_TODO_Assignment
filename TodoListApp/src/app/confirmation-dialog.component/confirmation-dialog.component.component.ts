import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h1 mat-dialog-title>Deleted</h1>
    <div mat-dialog-content>Your task has been deleted successfully.</div>
    <div mat-dialog-actions>
      <button mat-button (click)="dialogRef.close()">OK</button>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 400px;
    }

    .mat-dialog-container {
      background: rgba(0, 0, 0, 0.5);
    }

    h1 {
      color: white;
    }
  `]
})
export class ConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}
}
