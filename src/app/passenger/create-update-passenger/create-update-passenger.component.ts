import { Component, OnInit } from '@angular/core';
import { PassengerService } from '../../services/passenger.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageMode } from '../../enums/page-mode.enum';
import { CreateUpdatePassengerModel } from '../../models/passengers/createUpdatePassenger.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-update-passenger',
  templateUrl: './create-update-passenger.component.html',
  styleUrl: './create-update-passenger.component.css'
})
export class CreateUpdatePassengerComponent implements OnInit {

  form!: FormGroup;
  passengerId!: number;
  passenger?: CreateUpdatePassengerModel;

  thePageMode: PageMode = PageMode.Create;
  pageModeEnum = PageMode;

  constructor(
    private passengerSvc: PassengerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.setPassengerId();
    this.buildForm();

    if (this.thePageMode === PageMode.Update) {

      this.loadPassenger();
    }

  }

  submit(): void {

    if (this.form.valid) {

      if (this.thePageMode === PageMode.Create) {

        this.createPassenger();
      }
      else {

        this.editPassenger();
      }

    }

  }

  //#region Private Functions

  private setPassengerId(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      this.passengerId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.thePageMode = PageMode.Update;
    }
  }

  private buildForm(): void {

    this.form = this.fb.group({
      id: [0],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  private loadPassenger(): void {

    this.spinner.show();

    this.passengerSvc.getPassengerForEdit(this.passengerId).subscribe({
      next: (passengerFromApi: CreateUpdatePassengerModel) => {

        this.form.patchValue(passengerFromApi);
        this.passenger = passengerFromApi;
      },
      error: (err: HttpErrorResponse) => {

        this.snackBar.open(`ERROR: ${err.message}`, "Error")
      },
      complete: () => {

        this.spinner.hide();
      }
    });
  }

  private createPassenger(): void {

    this.spinner.show();

    this.passengerSvc.createPassenger(this.form.value).subscribe({
      next: () => {

        this.toastr.success(`Passenger has been created successfully.`);
        this.router.navigate(['/passenger']);
      },
      error: (err: HttpErrorResponse) => {

        this.snackBar.open(`ERROR: ${err.message}`, "Error");
      },
      complete: () => {

        this.spinner.hide();
      }
    });
  }

  private editPassenger(): void {

    this.spinner.show();

    this.passengerSvc.editPassenger(this.form.value).subscribe({
      next: () => {

        this.toastr.success("Passenger has been saved successfully.");
        this.router.navigate(['/passenger']);
      },
      error: (err: HttpErrorResponse) => {

        this.snackBar.open(`ERROR: ${err.message}`, "Error");
      },
      complete: () => {

        this.spinner.hide();
      }
    });
  }

  //#endregion

}
