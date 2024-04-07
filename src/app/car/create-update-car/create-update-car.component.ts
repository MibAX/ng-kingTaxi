import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-update-car',
  templateUrl: './create-update-car.component.html',
  styleUrl: './create-update-car.component.css'
})
export class CreateUpdateCarComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private carSvc: CarService,
    private router: Router) { }

  ngOnInit(): void {

    this.BuildForm();
  }

  submit(): void {

    if (this.form.valid) {

      this.createCar();
    }
  }

  //#region Private Methods

  private BuildForm(): void {

    this.form = this.fb.group({
      "plateNumber": ['', Validators.required],
      "model": ['', Validators.required],
      "manufactureDate": ['', Validators.required],
      "powerType": ['', Validators.required]
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
