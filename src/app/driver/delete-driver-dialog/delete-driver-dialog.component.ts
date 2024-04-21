import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DriverModel } from '../../models/drivers/driver.model';

@Component({
  selector: 'app-delete-driver-dialog',
  templateUrl: './delete-driver-dialog.component.html',
  styleUrl: './delete-driver-dialog.component.css'
})
export class DeleteDriverDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteDriverDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public driver: DriverModel) { }

}
