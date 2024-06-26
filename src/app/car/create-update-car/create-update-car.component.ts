import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateUpdateCarModel } from '../../models/cars/createUpdateCar.model';
import { PageMode } from '../../enums/page-mode.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-update-car',
  templateUrl: './create-update-car.component.html',
  styleUrl: './create-update-car.component.css'
})
export class CreateUpdateCarComponent implements OnInit {

  carId!: number;
  form!: FormGroup;
  car?: CreateUpdateCarModel;

  pageModeEnum = PageMode;

  thePageMode: PageMode = PageMode.Create;
  //thePageMode: number = 0;

  constructor(
    private fb: FormBuilder,
    private carSvc: CarService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

    this.setCarIdFromUrl();
    this.BuildForm();
    this.setPageMode();

    if (this.thePageMode === PageMode.Update) {

      this.loadCarForEdit();
    }
  }


  submit(): void {

    if (this.form.valid) {

      if (this.thePageMode === PageMode.Create) {

        this.createCar();
      }
      else {

        this.updateCar();
      }
    }
  }

  //#region Private Methods

  setCarIdFromUrl(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) { // localhost:4200/car/edit/17

      this.carId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    }

  }

  private BuildForm(): void {

    this.form = this.fb.group({
      "id": [0],
      "plateNumber": ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      "model": ['', Validators.required],
      "manufactureDate": ['', Validators.required],
      "powerType": ['', Validators.required]
    });
  }

  private setPageMode(): void {

    if (this.carId) {

      this.thePageMode = PageMode.Update;
    }
  }

  loadCarForEdit(): void {

    this.spinner.show();

    this.carSvc.getCarForEdit(this.carId).subscribe({
      next: (carFromApi: CreateUpdateCarModel) => {

        this.form.patchValue(carFromApi);
        this.car = carFromApi;
      },
      error: (err: HttpErrorResponse) => {

        this.snackBar.open(`ERROR: ${err.message}`, "Error")
      },
      complete: () => {

        this.spinner.hide();
      }
    });
  }

  private createCar(): void {

    this.spinner.show();

    this.carSvc.createCar(this.form.value).subscribe({
      next: () => {

        this.router.navigate(['/car']);
        this.toastr.success(`Car has been created successfully.`);
      },
      error: (err: HttpErrorResponse) => {

        this.snackBar.open(`ERROR: ${err.message}`, "Error")
      },
      complete: () => {

        this.spinner.hide();
      }
    });
  }

  private updateCar(): void {

    this.spinner.show();

    this.carSvc.updateCar(this.form.value).subscribe({
      next: () => {

        this.router.navigate(['/car']);
        this.toastr.success(`Car has been updated successfully.`);
      },
      error: (err: HttpErrorResponse) => {

        this.snackBar.open(`ERROR: ${err.message}`, "Error")
      },
      complete: () => {

        this.spinner.hide();
      }

    });
  }


  //#endregion
}
