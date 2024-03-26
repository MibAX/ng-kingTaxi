import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import { CarModel } from '../models/cars/car.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent implements OnInit {

  cars: CarModel[] = [];

  constructor(private carSvc: CarService) { }

  ngOnInit(): void {

    this.carSvc.getCars().subscribe({
      next: (carsFromApi: CarModel[]) => {
        this.cars = carsFromApi;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }


}
