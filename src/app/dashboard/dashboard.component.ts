import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  latLong: string = 'loading...';

  constructor() {}

  ngOnInit(): void {
    this.latLong = 'no support';
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latLong = position.coords.longitude.toString();
        this.latLong += ', ' + position.coords.latitude.toString();
      });
    }
  }
}
