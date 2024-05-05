import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { BookingModel } from '../models/bookings/booking.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DeleteBookingDialogComponent } from './delete-booking-dialog/delete-booking-dialog.component';
import { ToastrService } from 'ngx-toastr';

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
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {

    this.loadBookings();
  }

  deleteBooking(booking: BookingModel): void {

    const dialogRef = this.dialog.open(DeleteBookingDialogComponent, {
      data: booking
    });

    dialogRef.afterClosed().subscribe({
      next: (answer: boolean) => {

        if (answer) {

          this.spinner.show();

          this.bookingSvc.deleteBooking(booking.id).subscribe({
            next: () => {

              this.spinner.hide();
              this.toastr.success(`Booking #${booking.id} has been deleted successfully.`);
              this.loadBookings();
            }
          });
        }
      }
    });
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
