import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookingModel } from '../../models/bookings/booking.model';

@Component({
  selector: 'app-delete-booking-dialog',
  templateUrl: './delete-booking-dialog.component.html',
  styleUrl: './delete-booking-dialog.component.css'
})
export class DeleteBookingDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public booking: BookingModel
  ) { }
}
