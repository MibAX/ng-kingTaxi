import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { PassengerModel } from '../models/passengers/passenger.model';
import { PassengerDetailsModel } from '../models/passengers/passengerDetails.model';
import { CreateUpdatePassengerModel } from '../models/passengers/createUpdatePassenger.model';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  private passengerApiUrl: string = `${environment.apiUrl}/Passengers`;

  constructor(private http: HttpClient) { }

  getPassengers(): Observable<PassengerModel[]> {

    return this.http.get<PassengerModel[]>(`${this.passengerApiUrl}/GetPassengers`);
  }

  getPassenger(id: number): Observable<PassengerDetailsModel> {

    return this.http.get<PassengerDetailsModel>(`${this.passengerApiUrl}/GetPassenger/${id}`);
  }

  createPassenger(passenger: CreateUpdatePassengerModel): Observable<any> {

    return this.http.post(`${this.passengerApiUrl}/CreatePassenger`, passenger);
  }

  getPassengerForEdit(id: number): Observable<CreateUpdatePassengerModel> {

    return this.http.get<CreateUpdatePassengerModel>(`${this.passengerApiUrl}/GetPassengerForEdit/${id}`);
  }

  editPassenger(passenger: CreateUpdatePassengerModel): Observable<any> {

    return this.http.put(`${this.passengerApiUrl}/EditPassenger/${passenger.id}`, passenger);
  }

  deletePassenger(id: number): Observable<any> {

    return this.http.delete(`${this.passengerApiUrl}/DeletePassenger/${id}`);
  }
}