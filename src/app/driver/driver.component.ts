import { Component, OnInit } from '@angular/core';
import { DriverService } from '../services/driver.service';
import { DriverModel } from '../models/drivers/driver.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Gender } from '../enums/gender.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDriverDialogComponent } from './delete-driver-dialog/delete-driver-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrl: './driver.component.css'
})
export class DriverComponent implements OnInit {

  drivers: DriverModel[] = [];
  genderEnum = Gender;

  constructor(
    private driverSvc: DriverService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.loadDrivers();

  }

  deleteDriver(driverFromUI: DriverModel): void {

    const dialogRef = this.dialog.open(DeleteDriverDialogComponent, {
      data: driverFromUI
    });

    dialogRef.afterClosed().subscribe({
      next: (answer: boolean) => {

        if (answer) {

          this.driverSvc.deleteDriver(driverFromUI.id).subscribe({
            next: () => {

              this.loadDrivers();
              this.toastr.success(`Driver ${driverFromUI.fullName} has been deleted successfully.`);
            },
            error: (err: HttpErrorResponse) => {

              this.snackBar.open(`ERROR: ${err.message}`, "Error");
            }
          });

        }
      }
    })
  }

  //#region Private Functions

  private loadDrivers(): void {

    this.spinner.show();

    this.driverSvc.getDrivers().subscribe({
      next: (driversFromApi: DriverModel[]) => {

        this.drivers = driversFromApi;
      },
      error: (err: HttpErrorResponse) => {

        this.snackBar.open(`ERROR: ${err.message}`, "Error")
      },
      complete: () => {

        this.spinner.hide();
      }
    });
  }

  //#endregion
}
