import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import { CarModel } from '../models/cars/car.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent implements OnInit {

  cars: CarModel[] = [];

  constructor(
    private carSvc: CarService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.carSvc.getCars().subscribe({
      next: (carsFromApi: CarModel[]) => {
        this.cars = carsFromApi;
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open("Couldn't get cars. Please contact system admin.", "Ok");
      }
    });
  }


}
