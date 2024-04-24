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
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
