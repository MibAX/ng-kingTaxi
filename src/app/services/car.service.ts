import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarModel } from '../models/cars/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  getCars(): Observable<CarModel[]> {

    return this.http.get<CarModel[]>("https://localhost:7038/api/Cars/GetCars");
  }
}
