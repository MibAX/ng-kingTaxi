import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingModel } from '../models/bookings/booking.model';
import { BookingDetailsModel } from '../models/bookings/bookingDetails.model';
import { environment } from '../../environments/environment.development';
import { CreateUpdateBookingModel } from '../models/bookings/createUpdateBooking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private bookingApiUrl = `${environment.apiUrl}/Bookings`;

  constructor(private http: HttpClient) { }

  getBookings(): Observable<BookingModel[]> {

    return this.http.get<BookingModel[]>(`${this.bookingApiUrl}/GetBookings`);
  }

  getBooking(id: number): Observable<BookingDetailsModel> {

    return this.http.get<BookingDetailsModel>(`${this.bookingApiUrl}/GetBooking/${id}`);
  }

  createBooking(booking: CreateUpdateBookingModel): Observable<number> {

    return this.http.post<number>(`${this.bookingApiUrl}/CreateBooking`, booking);
  }

  getBookingForEdit(id: number): Observable<CreateUpdateBookingModel> {

    return this.http.get<CreateUpdateBookingModel>(`${this.bookingApiUrl}/GetBookingForEdit/${id}`);
  }

  editBooking(booking: CreateUpdateBookingModel): Observable<any> {

    return this.http.put(`${this.bookingApiUrl}/EditBooking/${booking.id}`, booking);
  }

  deleteBooking(id: number): Observable<any> {

    return this.http.delete(`${this.bookingApiUrl}/DeleteBooking/${id}`);
  }
}
