import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../services/driver.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gender } from '../../enums/gender.enum';
import { PageMode } from '../../enums/page-mode.enum';
import { CreateUpdateDriverModel } from '../../models/drivers/createUpdateDriver.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-update-driver',
  templateUrl: './create-update-driver.component.html',
  styleUrl: './create-update-driver.component.css'
})
export class CreateUpdateDriverComponent implements OnInit {

  form!: FormGroup;
  thePageMode: PageMode = PageMode.Create;
  pageModeEnum = PageMode;

  driver?: CreateUpdateDriverModel;

  constructor(
    private driverSvc: DriverService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.buildFrom();
  }

  submit(): void {

    if (this.form.valid) {

      if (this.thePageMode === PageMode.Create) {

        this.createDriver();
      }
    }
  }

  //#region Private Methods

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

  private createDriver(): void {

    this.driverSvc.createDrivers(this.form.value).subscribe({
      next: () => {

        this.router.navigate(['/driver']);
      },
      error: (err: HttpErrorResponse) => {

        this.snackBar.open(`ERROR: ${err.message}`, "Error")
      }

    });
  }

  //#endregion

}
