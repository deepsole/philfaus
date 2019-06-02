import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Driver } from './driver.model';
import { stringify } from '@angular/compiler/src/util';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

// const BACKEND_URL = environment.apiUrl + '/posts/';

@Injectable({providedIn: 'root'})
export class DriversService {

  private drivers: Driver[] = [];
  private driversUpdated = new Subject<{drivers: Driver[], driverCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}
  getDrivers(driversPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${driversPerPage}&page=${currentPage}`;
    this.http.get<{message: string, drivers: any, maxDrivers: number }>('http://localhost:3000/api/drivers' + queryParams)
      .pipe(map((driverData) => {
        return { drivers: driverData.drivers.map(driver => {
          return {
            id: driver._id,
            fname: driver.fname,
            lname: driver.lname,
            address: driver.address,
            license: driver.license,
            phone: driver.phone,
            amount: driver.amount,
            weekAmount: driver.weekAmount,
            carMake: driver.carMake,
            carModel: driver.carModel,
            carChasis: driver.carChasis,
            carReg: driver.carReg,
            date: driver.date,
          };
        }), maxDrivers: driverData.maxDrivers
      };

      }))
      .subscribe((transformedDriverData) => {
        this.drivers = transformedDriverData.drivers;
        this.driversUpdated.next({
          drivers: [...this.drivers],
          driverCount: transformedDriverData.maxDrivers
        });
      });
  }

  getDriverUpdateListener() {
    return this.driversUpdated.asObservable();
  }

  // getAllDriver(): Observable<Driver[]> {
  //   return this.http.get<Driver[]>(this.serviceUrl);
  // }

  getDriver(id: string) {
    return this.http.get<{
      _id: string;
      fname: string;
      lname: string;
      address: string;
      license: string;
      phone: string;
      amount: string;
      weekAmount: string;
      carMake: string;
      carModel: string;
      carChasis: string;
      carReg: string;
      date: string

    }>('http://localhost:3000/api/drivers/' + id)
  }


  addDriver(
{ id, fname, lname, address, license, phone, amount, weekAmount, carMake, carModel, carChasis, carReg, date }: { id: string, fname: string; lname: string; address: string; license: string; phone: string; amount: string; weekAmount: string; carMake: string; carModel: string; carChasis: string; carReg: string; date: string; }    ) {
    const driver: Driver = { id: id, fname: fname, lname: lname, address: address, license: license, phone: phone, amount: amount, weekAmount: weekAmount, carMake: carMake, carModel: carModel, carChasis: carChasis, carReg: carReg, date: date}
    this.http.post<{message: string, driverId: string}>('http://localhost:3000/api/drivers', driver)
      .subscribe((responseData) => {
        // const id = responseData.driverId;
        // driver.id = id;
        // this.drivers.push(driver);
        // this.driversUpdated.next([...this.drivers]);
        this.router.navigate(['/']);
      });
  }

  updateDriver(
    id: string,
    fname: string,
    lname: string,
    address: string,
    license: string,
    phone: string,
    amount: string,
    weekAmount: string,
    carMake: string,
    carModel: string,
    carChasis: string,
    carReg: string,
    date: string
    ) {
        const driver: Driver = {
          id: id,
          fname: fname,
          lname: lname,
          address: address,
          license: license,
          phone: phone,
          amount: amount,
          weekAmount: weekAmount,
          carMake: carMake,
          carModel: carModel,
          carChasis: carChasis,
          carReg: carReg,
          date: date
        }
        this.http.put('http://localhost:3000/api/drivers/' + id, driver)
          .subscribe(response => {
            // const updatedDrivers = [...this.drivers];
            // const oldDriverIndex = updatedDrivers.findIndex(p => p.id === driver.id);
            // updatedDrivers[oldDriverIndex] = driver;
            // this.drivers = updatedDrivers;
            // this.driversUpdated.next([...this.drivers]);
            this.router.navigate(['/']);
          });
    }



  deleteDriver(driverId: string) {
    return this.http.delete('http://localhost:3000/api/drivers/' + driverId);
      // .subscribe(() => {
      //   const updatedDrivers = this.drivers.filter(driver => driver.id !== driverId);
      //   this.drivers = updatedDrivers;
      //   this.driversUpdated.next([...this.drivers]);
      // });
  }
}


