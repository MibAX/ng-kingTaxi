import { Component, OnInit } from '@angular/core';
import { PassengerService } from '../services/passenger.service';
import { PassengerModel } from '../models/passengers/passenger.model';
import { Gender } from '../enums/gender.enum';
import { MatDialog } from '@angular/material/dialog';
import { DeletePassengerDialogComponent } from './delete-passenger-dialog/delete-passenger-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrl: './passenger.component.css'
})
export class PassengerComponent implements OnInit {

  passengers: PassengerModel[] = [];
  genderEnum = Gender;

  constructor(
    private passengerSvc: PassengerService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.loadPassengers();
  }

  deletePassenger(passenger: PassengerModel): void {

    const dialogRef = this.dialog.open(DeletePassengerDialogComponent, {
      data: passenger
    });

    dialogRef.afterClosed().subscribe({
      next: (answer: boolean) => {

        if (answer) {

          this.spinner.show();

          this.passengerSvc.deletePassenger(passenger.id).subscribe({
            next: () => {

              this.toastr.success(`Passenger ${passenger.fullName} has been deleted successfully.`);
              this.loadPassengers();
              this.spinner.hide();
            }
          });
        }
      }
    });

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
