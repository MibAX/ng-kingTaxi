import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CarModel } from '../../models/cars/car.model';

@Component({
  selector: 'app-delete-car-dialog',
  templateUrl: './delete-car-dialog.component.html',
  styleUrl: './delete-car-dialog.component.css'
})
export class DeleteCarDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteCarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public car: CarModel,
  ) { }

}
