import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../services/driver.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gender } from '../../enums/gender.enum';
import { PageMode } from '../../enums/page-mode.enum';
import { CreateUpdateDriverModel } from '../../models/drivers/createUpdateDriver.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-update-driver',
  templateUrl: './create-update-driver.component.html',
  styleUrl: './create-update-driver.component.css'
})
export class CreateUpdateDriverComponent implements OnInit {

  driverId!: number;
  thePageMode: PageMode = PageMode.Create;
  form!: FormGroup;
  driver?: CreateUpdateDriverModel;

  pageModeEnum = PageMode;

  constructor(
    private driverSvc: DriverService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.setIdFromUrl();

    this.buildFrom();

    if (this.thePageMode == PageMode.Update) {

      this.loadDriver();
    }
  }

  submit(): void {

    if (this.form.valid) {

      if (this.thePageMode === PageMode.Create) {

        this.createDriver();
      }
      else {

        this.updateDriver();
      }
    }
  }

  //#region Private Methods

  private setIdFromUrl(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      this.driverId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

      this.thePageMode = PageMode.Update;
    }
  }

  private buildFrom(): void {

    this.form = this.fb.group({
      id: [0],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      gender: [Gender.Male],
      rating: [0],
    });
  }

  private loadDriver(): void {

    this.spinner.show();

    this.driverSvc.getDriverForEdit(this.driverId).subscribe({
      next: (driverFromApi: CreateUpdateDriverModel) => {

        this.form.patchValue(driverFromApi);
        this.driver = driverFromApi;
      },
      error: (err: HttpErrorResponse) => {

        this.snackBar.open(`ERROR: ${err.message}`, "Error")
      },
      complete: () => {

        this.spinner.hide();
      }
    });

  }

  private createDriver(): void {

    this.spinner.show();

    this.driverSvc.createDriver(this.form.value).subscribe({
      next: () => {

        this.router.navigate(['/driver']);
        this.toastr.success(`Driver has been created successfully.`);
      },
      error: (err: HttpErrorResponse) => {

        this.snackBar.open(`ERROR: ${err.message}`, "Error")
      },
      complete: () => {

        this.spinner.hide();
      }

    });
  }

  private updateDriver(): void {

    this.spinner.show();

    this.driverSvc.updateDeriver(this.form.value).subscribe({
      next: () => {

        this.router.navigate(['/driver']);
        this.toastr.success(`Driver has been updated successfully.`);
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
