import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from '../../services/booking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageMode } from '../../enums/page-mode.enum';
import { CreateUpdateBookingModel } from '../../models/bookings/createUpdateBooking.model';
import { LookupModel } from '../../models/lookup.model';
import { PassengerService } from '../../services/passenger.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CarService } from '../../services/car.service';
import { DriverService } from '../../services/driver.service';

@Component({
  selector: 'app-create-update-booking',
  templateUrl: './create-update-booking.component.html',
  styleUrl: './create-update-booking.component.css'
})
export class CreateUpdateBookingComponent implements OnInit {

  minDate!: Date;

  form!: FormGroup;
  booking?: CreateUpdateBookingModel;

  passengerLookup: LookupModel[] = [];
  driverLookup: LookupModel[] = [];
  carLookup: LookupModel[] = [];


  thePageMode: PageMode = PageMode.Create;
  pageModeEnum = PageMode;

  constructor(
    private bookingSvc: BookingService,
    private passengerSvc: PassengerService,
    private driverSvc: DriverService,
    private carSvc: CarService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) {

    this.setPickupTimeMin();
  }

  ngOnInit(): void {

    this.loadLookups();
    this.buildForm();
  }

  submit(): void {

    if (this.form.valid) {
      alert("From is valid");
    }
    else {
      alert("From is invalid");
    }
  }

  //#region Private Functions

  private loadLookups(): void {

    this.loadPassengerLookup();
    this.loadDriverLookup();
    this.loadCarLookup();

  }

  private buildForm(): void {

    this.form = this.fb.group({
      id: [0],
      fromAddress: ['', Validators.required],
      toAddress: ['', Validators.required],
      pickUpTime: ['', Validators.required],
      passengerIds: [],
      carId: [''],
      driverId: [''],
    });
  }

  private loadPassengerLookup(): void {

    this.spinner.show();

    this.passengerSvc.getPassengerLookup().subscribe({
      next: (passengerLookupFromApi: LookupModel[]) => {

        this.passengerLookup = passengerLookupFromApi;
      },
      error: (err: HttpErrorResponse) => {

        this.snackBar.open(`ERROR: ${err.message}`, "Error");
      },
      complete: () => {

        this.spinner.hide();
      }
    });
  }

  private loadDriverLookup(): void {

    this.spinner.show();
    this.driverSvc.getDriverLookup().subscribe({
      next: (driverLookupFromApi: LookupModel[]) => {

        this.driverLookup = driverLookupFromApi;
      },
      error: (err: HttpErrorResponse) => {

        this.snackBar.open(`ERROR: ${err.message}`, "Error");
      },
      complete: () => {

        this.spinner.hide();
      }
    });

  }

  private loadCarLookup(): void {

    this.spinner.show();
    this.carSvc.getCarLookup().subscribe({
      next: (carLookupFromApi: LookupModel[]) => {

        this.carLookup = carLookupFromApi;
      },
      error: (err: HttpErrorResponse) => {

        this.snackBar.open(`ERROR: ${err.message}`, "Error");
      },
      complete: () => {

        this.spinner.hide();
      }
    });

  }

  private setPickupTimeMin(): void {

    const currentDate: Date = new Date(); // C# DateTime.Now

    const year: number = currentDate.getFullYear(); // 2024
    const month: number = currentDate.getMonth(); // Note: Months are zero-based (0 for January, 1 for February, etc.)
    const day: number = currentDate.getDate(); // 6

    this.minDate = new Date(year, month, day);
  }

  //#endregion
}
