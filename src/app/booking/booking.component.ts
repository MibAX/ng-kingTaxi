import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { BookingModel } from '../models/bookings/booking.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {

  bookings: BookingModel[] = [];

  constructor(
    private bookingSvc: BookingService,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
  ) { }


  ngOnInit(): void {

    this.loadBookings();
  }

  deleteBooking(booking: BookingModel): void {

    alert("[NOT IMPLEMENTED YET]");
  }

  //#region Private Functions

  private loadBookings(): void {

    this.spinner.show();

    this.bookingSvc.getBookings().subscribe({
      next: (bookingFromApi: BookingModel[]) => {

        this.bookings = bookingFromApi;
      },
      error: (err: HttpErrorResponse) => {

        this.snackBar.open(`Error: ${err.message}`, "Ok");
      },
      complete: () => {

        this.spinner.hide();
      }
    });

  }

  //#endregion
}
