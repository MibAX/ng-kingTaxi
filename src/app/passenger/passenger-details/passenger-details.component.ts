import { Component, OnInit } from '@angular/core';
import { PassengerService } from '../../services/passenger.service';
import { ActivatedRoute } from '@angular/router';
import { PassengerDetailsModel } from '../../models/passengers/passengerDetails.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-passenger-details',
  templateUrl: './passenger-details.component.html',
  styleUrl: './passenger-details.component.css'
})
export class PassengerDetailsComponent implements OnInit {

  passengerId!: number;
  passenger?: PassengerDetailsModel;

  constructor(
    private passengerSvc: PassengerService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.setPassengerId();
    this.loadPassenger();
  }

  //#region Private Methods

  private setPassengerId(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      this.passengerId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    }
  }

  private loadPassenger(): void {

    this.spinner.show();

    this.passengerSvc.getPassenger(this.passengerId).subscribe({
      next: (passengerFromApi: PassengerDetailsModel) => {

        this.passenger = passengerFromApi;
      },
      error: (err: HttpErrorResponse) => {

        this.snackBar.open("Couldn't get Passenger. Please contact system admin.", "Ok");
      },
      complete: () => {

        this.spinner.hide();
      }
    });
  }

  //#endregion 

}
