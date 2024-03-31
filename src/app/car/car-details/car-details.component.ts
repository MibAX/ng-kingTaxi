import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CarDetailsModel } from '../../models/cars/carDetails.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css'
})
export class CarDetailsComponent implements OnInit {

  carId!: number;
  carDetails!: CarDetailsModel;

  constructor(
    private carSvc: CarService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.setCarId();
    this.loadCarDetails();
  }


  //#region Private Method

  private setCarId(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      this.carId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    }
  }

  private loadCarDetails(): void {

    this.carSvc.getCar(this.carId).subscribe({
      next: (carDetailsFromApi: CarDetailsModel) => {

        this.carDetails = carDetailsFromApi;
      }
    });
  }

  //#endregion
}
