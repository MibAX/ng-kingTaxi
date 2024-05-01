import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarComponent } from './car/car.component';
import { CreateUpdateCarComponent } from './car/create-update-car/create-update-car.component';
import { CarDetailsComponent } from './car/car-details/car-details.component';
import { DriverComponent } from './driver/driver.component';
import { CreateUpdateDriverComponent } from './driver/create-update-driver/create-update-driver.component';
import { DriverDetailsComponent } from './driver/driver-details/driver-details.component';
import { PassengerComponent } from './passenger/passenger.component';
import { PassengerDetailsComponent } from './passenger/passenger-details/passenger-details.component';
import { CreateUpdatePassengerComponent } from './passenger/create-update-passenger/create-update-passenger.component';
import { BookingComponent } from './booking/booking.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'car',
    component: CarComponent
  },
  {
    path: 'car/add',
    component: CreateUpdateCarComponent
  },
  {
    path: 'car/edit/:id',
    component: CreateUpdateCarComponent
  },
  {
    path: 'car/details/:id',
    component: CarDetailsComponent
  },
  {
    path: 'driver',
    component: DriverComponent
  },
  {
    path: 'driver/details/:id',
    component: DriverDetailsComponent
  },
  {
    path: 'driver/add',
    component: CreateUpdateDriverComponent
  },
  {
    path: 'driver/edit/:id',
    component: CreateUpdateDriverComponent
  },
  {
    path: 'passenger',
    component: PassengerComponent
  },
  {
    path: 'passenger/details/:id',
    component: PassengerDetailsComponent
  },
  {
    path: 'passenger/add',
    component: CreateUpdatePassengerComponent
  },
  {
    path: 'passenger/edit/:id',
    component: CreateUpdatePassengerComponent
  },
  {
    path: 'booking',
    component: BookingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
