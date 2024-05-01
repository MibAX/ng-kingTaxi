import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingModel } from '../models/bookings/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  getBookings(): Observable<BookingModel[]> {

    return this.http.get<BookingModel[]>('https://localhost:7038/api/Bookings/GetBookings');
  }
}
