import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from '../../services/booking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageMode } from '../../enums/page-mode.enum';
import { CreateUpdateBookingModel } from '../../models/bookings/createUpdateBooking.model';

@Component({
  selector: 'app-create-update-booking',
  templateUrl: './create-update-booking.component.html',
  styleUrl: './create-update-booking.component.css'
})
export class CreateUpdateBookingComponent implements OnInit {

  minDate!: Date;

  form!: FormGroup;
  booking?: CreateUpdateBookingModel;

  thePageMode: PageMode = PageMode.Create;
  pageModeEnum = PageMode;

  constructor(
    private bookingSvc: BookingService,
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

  private setPickupTimeMin(): void {

    const currentDate: Date = new Date();

    const year: number = currentDate.getFullYear();
    const month: number = currentDate.getMonth(); // Note: Months are zero-based (0 for January, 1 for February, etc.)
    const day: number = currentDate.getDate();

    this.minDate = new Date(year, month, day);
  }

  //#endregion
}
