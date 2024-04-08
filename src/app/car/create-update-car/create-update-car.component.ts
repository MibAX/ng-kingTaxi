import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateUpdateCarModel } from '../../models/cars/createUpdateCar.model';

@Component({
  selector: 'app-create-update-car',
  templateUrl: './create-update-car.component.html',
  styleUrl: './create-update-car.component.css'
})
export class CreateUpdateCarComponent implements OnInit {

  carId!: number;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private carSvc: CarService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.setCarIdFromUrl();
    this.BuildForm();

    if (this.carId) {

      this.loadCarForEdit();
    }
  }


  submit(): void {

    if (this.form.valid) {

      this.createCar();
    }
  }

  //#region Private Methods

  setCarIdFromUrl(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      this.carId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    }

  }

  private BuildForm(): void {

    this.form = this.fb.group({
      "plateNumber": ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      "model": ['', Validators.required],
      "manufactureDate": ['', Validators.required],
      "powerType": ['', Validators.required]
    });
  }

  loadCarForEdit(): void {

    this.carSvc.getCarForEdit(this.carId).subscribe({
      next: (carFromApi: CreateUpdateCarModel) => {

        this.form.patchValue(carFromApi);
      }
    });
  }

  private createCar(): void {

    this.carSvc.createCar(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/car']);
      }
    });
  }


  //#endregion
}
