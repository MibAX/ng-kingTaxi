import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './car/car.component';
import { HomeComponent } from './home/home.component';
import { CreateUpdateCarComponent } from './car/create-update-car/create-update-car.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { CarDetailsComponent } from './car/car-details/car-details.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { MaterialModule } from './shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteCarDialogComponent } from './car/delete-car-dialog/delete-car-dialog.component';
import { DriverComponent } from './driver/driver.component';
import { StarRatingModule } from 'angular-star-rating';
import { CreateUpdateDriverComponent } from './driver/create-update-driver/create-update-driver.component';
import { DeleteDriverDialogComponent } from './driver/delete-driver-dialog/delete-driver-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    HomeComponent,
    CreateUpdateCarComponent,
    CarDetailsComponent,
    DeleteCarDialogComponent,
    DriverComponent,
    CreateUpdateDriverComponent,
    DeleteDriverDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule.forRoot({ type: 'line-scale' }),
    MaterialModule,
    ReactiveFormsModule,
    StarRatingModule.forRoot()
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
