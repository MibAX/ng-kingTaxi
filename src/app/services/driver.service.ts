import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { DriverModel } from '../models/drivers/driver.model';
import { CreateUpdateDriverModel } from '../models/drivers/createUpdateDriver.model';
import { DriverDetailsModel } from '../models/drivers/driverDetails.model';
import { LookupModel } from '../models/lookup.model';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private driverApiUrl: string = `${environment.apiUrl}/Drivers`;

  constructor(private http: HttpClient) { }

  getDrivers(): Observable<DriverModel[]> {

    return this.http.get<DriverModel[]>(`${this.driverApiUrl}/GetDrivers`);
  }

  getDriver(id: number): Observable<DriverDetailsModel> {

    return this.http.get<DriverDetailsModel>(`${this.driverApiUrl}/GetDriver/${id}`);
  }

  createDriver(driver: CreateUpdateDriverModel): Observable<any> {

    return this.http.post(`${this.driverApiUrl}/CreateDriver`, driver);
  }

  getDriverForEdit(id: number): Observable<CreateUpdateDriverModel> {

    return this.http.get<CreateUpdateDriverModel>(`${this.driverApiUrl}/GetDriverForEdit/${id}`);
  }

  deleteDriver(id: number): Observable<any> {

    return this.http.delete(`${this.driverApiUrl}/DeleteDriver/${id}`);
  }

  updateDeriver(driver: CreateUpdateDriverModel): Observable<any> {

    return this.http.put(`${this.driverApiUrl}/EditDriver/${driver.id}`, driver);
  }

  getDriverLookup(): Observable<LookupModel[]> {

    return this.http.get<LookupModel[]>(`${this.driverApiUrl}/GetDriverLookup/`);
  }
}
