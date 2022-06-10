import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private latitude: number = 41.73186945316638; // Defaults to center of Ankeny.
  private longitude: number = -93.60038578882418;

  // TODO: provide subscription, for service users to update

  constructor() {
    let watchId: number = navigator.geolocation?.watchPosition(
      (position: GeolocationPosition) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      },
      null,
      {
        enableHighAccuracy: false,
        timeout: Infinity,
        maximumAge: 60 * 1000,
      }
    );

    setTimeout(() => {
      navigator.geolocation?.clearWatch(watchId);
    }, 10 * 60 * 1000);
  }

  getLatitude(): number {
    return this.latitude;
  }

  getLongitude(): number {
    return this.longitude;
  }

  distanceTo(lat: number, lon: number) {
    return LocationService.distance(this.latitude, lat, this.longitude, lon);
  }

  static distance(
    lat1: number,
    lat2: number,
    lon1: number,
    lon2: number
  ): number {
    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 = (lon1 * Math.PI) / 180;
    lon2 = (lon2 * Math.PI) / 180;
    lat1 = (lat1 * Math.PI) / 180;
    lat2 = (lat2 * Math.PI) / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a =
      Math.pow(Math.sin(dlat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth. Use 3956
    // for miles, 6371 for kilometers.
    let r = 3956;

    // calculate the result
    return c * r;
  }
}
