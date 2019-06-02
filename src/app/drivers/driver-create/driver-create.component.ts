import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

// import { mimeType } from './mime-type.validator';
import { Driver } from '../driver.model';
import { DriversService } from '../drivers.service';
import { AuthService } from 'src/app/auth/auth.service';

export interface Car {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-driver-create',
  templateUrl: './driver-create.component.html',
  styleUrls: ['./driver-create.component.css']

})

export class DriverCreateComponent implements OnInit, OnDestroy {
  driver: Driver;
  isLoading = false;
  private mode = 'create';
  private driverId: string;
  private authStatusSub: Subscription;
  carMake: string;

  myDatee = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  myDate = new Date();

  selectedValue: string;
  selectedDate: string;

  cars: Car[] = [
    {value: 'toyota', viewValue: 'Toyota'},
    {value: 'kia', viewValue: 'KIA'},
    {value: 'hyundai', viewValue: 'Hyundai'},
    {value: 'nissan', viewValue: 'Nissan'},
  ];

  constructor(
    public driversService: DriversService,
    public route: ActivatedRoute,
    private authService: AuthService
    ) {}


  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authStatus => {
      this.isLoading = false;
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('driverId')) {
        this.mode = 'edit';
        this.driverId = paramMap.get('driverId');
        this.isLoading = true;
        this.driversService.getDriver(this.driverId).subscribe(driverData => {
          this.isLoading = false;
          this.driver = {
            id: driverData._id,
            fname: driverData.fname,
            lname: driverData.lname,
            address: driverData.address,
            license: driverData.license,
            phone: driverData.phone,
            amount: driverData.amount,
            weekAmount: driverData.weekAmount,
            carMake: driverData.carMake,
            carModel: driverData.carModel,
            carChasis: driverData.carChasis,
            carReg: driverData.carReg,
            date: driverData.date
           };
        });
      } else {
        this.mode = 'create';
        this.driverId = null;
      }
    });
  }

  onSaveDriver(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
    const driver: Driver  = {
      id: null,
      fname: form.value.fname,
      lname: form.value.lname,
      address: form.value.address,
      license: form.value.license,
      phone: form.value.phone,
      amount: form.value.amount,
      weekAmount: form.value.weekAmount,
      carMake: form.value.carMake,
      carModel: form.value.carModel,
      carChasis: form.value.carChasis,
      carReg: form.value.carReg,
      date: form.value.date
    };
    this.driversService.addDriver(driver);
    } else {
      this.driversService.updateDriver(
        this.driverId,
        form.value.fname,
        form.value.lname,
        form.value.address,
        form.value.license,
        form.value.phone,
        form.value.amount,
        form.value.weekAmount,
        form.value.carMake,
        form.value.carModel,
        form.value.carChasis,
        form.value.carReg,
        form.value.date
        )
    }

    form.resetForm();

  }

ngOnDestroy() {
  this.authStatusSub.unsubscribe();
   }
}
