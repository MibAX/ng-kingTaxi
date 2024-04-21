import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { DriverModel } from '../models/drivers/driver.model';
import { CreateUpdateDriverModel } from '../models/drivers/createUpdateDriver.model';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private driverApiUrl: string = `${environment.apiUrl}/Drivers`;

  constructor(private http: HttpClient) { }

  getDrivers(): Observable<DriverModel[]> {

    return this.http.get<DriverModel[]>(`${this.driverApiUrl}/GetDrivers`);
  }

  createDrivers(driver: CreateUpdateDriverModel): Observable<any> {

    return this.http.post(`${this.driverApiUrl}/CreateDriver`, driver);
  }

  deleteDriver(id: number): Observable<any> {

    return this.http.delete(`${this.driverApiUrl}/DeleteDriver/${id}`);
  }
}
