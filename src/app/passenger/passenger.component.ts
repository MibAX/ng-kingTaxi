import { Component, OnInit } from '@angular/core';
import { PassengerService } from '../services/passenger.service';
import { PassengerModel } from '../models/passengers/passenger.model';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrl: './passenger.component.css'
})
export class PassengerComponent implements OnInit {

  passengers: PassengerModel[] = [];

  constructor(
    private passengerSvc: PassengerService
  ) { }

  ngOnInit(): void {

    this.loadPassengers();
  }

  deletePassenger(passenger: PassengerModel): void {

    // TO DO mat Dialog confirmation delete
  }

  //#region Private Functions

  private loadPassengers(): void {

    this.passengerSvc.getPassengers().subscribe({
      next: (passengerFromApi: PassengerModel[]) => {

        this.passengers = passengerFromApi;
      }
    });
  }

  //#endregion

}
