import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DriverService } from '../../services/driver.service';
import { DriverDetailsModel } from '../../models/drivers/driverDetails.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { Gender } from '../../enums/gender.enum';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrl: './driver-details.component.css'
})
export class DriverDetailsComponent implements OnInit {

  driverId!: number;
  driver?: DriverDetailsModel;
  driverRating: number = 0;

  genderEnum = Gender;

  constructor(
    private activatedRoute: ActivatedRoute,
    private driverSvc: DriverService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.setDriverId();
    this.loadDriver();
  }


  //#region Private Functions

  private setDriverId(): void {

    if (this.activatedRoute.snapshot.paramMap.get("id")) {

      this.driverId = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    }
  }

  private loadDriver(): void {

    this.spinner.show();

    this.driverSvc.getDriver(this.driverId).subscribe({
      next: (driverDetailsFromApi: DriverDetailsModel) => {

        this.driver = driverDetailsFromApi;
        this.driverRating = driverDetailsFromApi.rating;
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
