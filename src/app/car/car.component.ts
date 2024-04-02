import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import { CarModel } from '../models/cars/car.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent implements OnInit {

  cars: CarModel[] = [];

  constructor(
    private carSvc: CarService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

    this.getCars();
  }


  //#region Private Functions

  private getCars(): void {

    this.spinner.show();

    this.carSvc.getCars().subscribe({
      next: (carsFromApi: CarModel[]) => {

        this.cars = carsFromApi;
        this.spinner.hide();
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open("Couldn't get cars. Please contact system admin.", "Ok");
      }
    });
  }

  //#endregion
}
