import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarModel } from '../models/cars/car.model';
import { CarDetailsModel } from '../models/cars/carDetails.model';
import { environment } from '../../environments/environment.development';
import { CreateUpdateCarModel } from '../models/cars/createUpdateCar.model';

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

  createCar(car: CreateUpdateCarModel): Observable<any> {

    return this.http.post(`${this.carApiUrl}/CreateCar`, car);
  }

  getCarForEdit(id: number): Observable<CreateUpdateCarModel> {

    return this.http.get<CreateUpdateCarModel>(`${this.carApiUrl}/GetCarForEdit/${id}`);
  }

  updateCar(car: CreateUpdateCarModel): Observable<any> {

    return this.http.put(`${this.carApiUrl}/EditCar/${car.id}`, car);
  }

  deleteCar(id: number): Observable<any> {

    return this.http.delete(`${this.carApiUrl}/DeleteCar/${id}`);
  }

}
