import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CarDetailsModel } from '../../models/cars/carDetails.model';
import { ActivatedRoute } from '@angular/router';
import { PowerType } from '../../enums/power-type.enum';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css'
})
export class CarDetailsComponent implements OnInit {

  public carId!: number;
  public carDetails!: CarDetailsModel;
  public powerTypeEnum = PowerType;

  constructor(
    private carSvc: CarService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.setCarId();
    this.getCarDetails();
  }


  //#region Private Method

  private setCarId(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      this.carId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    }
  }

  private getCarDetails(): void {

    this.spinner.show();

    this.carSvc.getCar(this.carId).subscribe({
      next: (carDetailsFromApi: CarDetailsModel) => {

        this.spinner.hide();
        this.carDetails = carDetailsFromApi;
      }
    });
  }

  //#endregion
}
