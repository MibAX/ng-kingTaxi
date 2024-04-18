import { Component, OnInit } from '@angular/core';
import { DriverService } from '../services/driver.service';
import { DriverModel } from '../models/drivers/driver.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Gender } from '../enums/gender.enum';
import { NgxSpinnerService } from 'ngx-spinner';

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
  ) { }

  ngOnInit(): void {

    this.loadDrivers();

  }

  deleteDriver(driver: DriverModel): void {


  }

  //#region Private Functions

  private loadDrivers(): void {

    this.spinner.show();

    this.driverSvc.getDrivers().subscribe({
      next: (driversFromApi: DriverModel[]) => {

        this.drivers = driversFromApi;
        this.spinner.hide();
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open("Couldn't get cars. Please contact system admin.", "Ok");
      }

    });
  }

  //#endregion
}
