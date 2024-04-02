import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarModel } from '../models/cars/car.model';
import { CarDetailsModel } from '../models/cars/carDetails.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private carApiUrl: string = `${environment.apiUrl}/Cars`;

  constructor(private http: HttpClient) { }


  getCars(): Observable<CarModel[]> {

    return this.http.get<CarModel[]>(`${this.carApiUrl}/GetCars`);
  }

  getCar(id: number): Observable<CarDetailsModel> {

    return this.http.get<CarDetailsModel>(`${this.carApiUrl}/GetCar/${id}`);
  }

}
