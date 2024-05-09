import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { BookingDetailsModel } from '../../models/bookings/bookingDetails.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { Gender } from '../../enums/gender.enum';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css'
})
export class BookingDetailsComponent implements OnInit {

  bookingId!: number;
  booking?: BookingDetailsModel;
  bookingRating: number = 0;

  genderEnum = Gender;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bookingSvc: BookingService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.setBookingId();
    this.loadBooking();
  }


  //#region Private Functions

  private setBookingId(): void {

    if (this.activatedRoute.snapshot.paramMap.get("id")) {

      this.bookingId = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    }
  }

  private loadBooking(): void {

    this.spinner.show();

    this.bookingSvc.getBooking(this.bookingId).subscribe({
      next: (bookingDetailsFromApi: BookingDetailsModel) => {

        this.booking = bookingDetailsFromApi;
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
