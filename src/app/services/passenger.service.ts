import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { PassengerModel } from '../models/passengers/passenger.model';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  private passengerApiUrl: string = `${environment.apiUrl}/Passengers`;

  constructor(private http: HttpClient) { }

  getPassengers(): Observable<PassengerModel[]> {

    return this.http.get<PassengerModel[]>(`${this.passengerApiUrl}/GetPassengers`);
  }
}
