import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import { CarModel } from '../models/cars/car.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeleteCarDialogComponent } from './delete-car-dialog/delete-car-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent implements OnInit {

  cars: CarModel[] = [];

  constructor(
    private carSvc: CarService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    this.getCars();
  }

  deleteCar(car: CarModel): void {

    const dialogRef = this.dialog.open(DeleteCarDialogComponent, {
      data: car
    });


    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.carSvc.deleteCar(car.id).subscribe({
          next: () => {

            this.getCars();
            this.toastr.success(`Car has been deleted successfully.`);
          },
          error: (err: HttpErrorResponse) => {

            this.snackBar.open(`ERROR: ${err.message}`, "Error");
          }
        });

      }

    });
  }

  //#region Private Functions

  private getCars(): void {

    this.spinner.show();

    this.carSvc.getCars().subscribe({
      next: (carsFromApi: CarModel[]) => {

        this.cars = carsFromApi;
        this.spinner.hide();
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open("Couldn't get cars. Please contact system admin.", "Ok");
      }
    });
  }

  //#endregion
}
