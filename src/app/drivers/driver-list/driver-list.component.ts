import { Component, OnInit, OnDestroy } from '@angular/core';

import { PageEvent, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

import { Driver } from '../driver.model';
import { DriversService } from '../drivers.service';
import { AuthService } from 'src/app/auth/auth.service';
// import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: "First Post", content: "This is my first post's content"},
  //   { title: 'Second Post', content: "This is my second post's content"},
  //   { title: 'Third Post', content: "This is my third post's content"},
  // ]

  headElements = ['ID', 'First', 'Last', 'Handle'];

  drivers: Driver[] = [];
  isLoading = false;
  totalDrivers = 0;
  driversPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  // userId: string;
  private driversSub: Subscription;
  private authStatusSub: Subscription;

  constructor(public driversService: DriversService, private authService: AuthService) {}


  ngOnInit() {
    this.isLoading = true;
    this.driversService.getDrivers(this.driversPerPage, this.currentPage);
    this.driversSub = this.driversService.getDriverUpdateListener()
      .subscribe((driverData: {drivers: Driver[], driverCount: number}) => {
        this.isLoading = false;
        this.totalDrivers = driverData.driverCount;
        this.drivers = driverData.drivers;
        });
  //     this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
  //       this.userId = this.authService.getUserId();
       });
     }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.driversPerPage = pageData.pageSize;
    this.driversService.getDrivers(this.driversPerPage, this.currentPage);
  }

  onDelete(driverId: string) {
  this.isLoading = true;
  this.driversService.deleteDriver(driverId).subscribe(() => {
    this.driversService.getDrivers(this.driversPerPage, this.currentPage);
  }, () => {
    this.isLoading = false;
  });
  }

  ngOnDestroy() {
  this.driversSub.unsubscribe();
  this.authStatusSub.unsubscribe();
  }
}
