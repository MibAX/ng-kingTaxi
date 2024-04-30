import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PassengerModel } from '../../models/passengers/passenger.model';

@Component({
  selector: 'app-delete-passenger-dialog',
  templateUrl: './delete-passenger-dialog.component.html',
  styleUrl: './delete-passenger-dialog.component.css'
})
export class DeletePassengerDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeletePassengerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public passenger: PassengerModel,
  ) { }
}
