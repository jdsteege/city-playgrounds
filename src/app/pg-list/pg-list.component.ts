import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { PlaygroundDef } from '../models/playground-def';
import { HouseholdPgData } from 'src/app/models/household-pg-data';
import { map } from 'rxjs/operators';
//
import pgDefsJson from '../../assets/ankeny_playgrounds.json';

@Component({
  selector: 'app-pg-list',
  templateUrl: './pg-list.component.html',
  styleUrls: ['./pg-list.component.scss'],
})
export class PgListComponent implements OnInit {
  playgroundDefs: PlaygroundDef[] = pgDefsJson.playgrounds;
  allHouseholdData?: HouseholdPgData[];
  currentLat: number = 0;
  currentLong: number = 0;

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {
    if (this.currentLat == 0 && this.currentLong == 0) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.currentLat = position.coords.latitude;
          this.currentLong = position.coords.longitude;
          this.sortDefsByDistance();
        });
      }
    } else {
      this.sortDefsByDistance();
    }

    this.retrieveHHData();
  }

  sortDefsByDistance() {
    if (this.currentLat != 0 && this.currentLong != 0) {
      this.playgroundDefs = this.playgroundDefs.sort((a, b) => {
        return (
          this.distance(
            this.currentLat,
            a.latitude ?? 0,
            this.currentLong,
            a.longitude ?? 0
          ) -
          this.distance(
            this.currentLat,
            b.latitude ?? 0,
            this.currentLong,
            b.longitude ?? 0
          )
        );
      });
    }
  }

  distance(lat1: number, lat2: number, lon1: number, lon2: number): number {
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

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 6371;

    // calculate the result
    return c * r;
  }

  retrieveHHData(): void {
    this.databaseService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.allHouseholdData = data;
      });
  }

  getHouseholdDataForPlayground(
    playgroundId: string | undefined
  ): HouseholdPgData | undefined {
    if (playgroundId && this.allHouseholdData) {
      for (const hhd of this.allHouseholdData) {
        if (hhd.playground_id == playgroundId) {
          return hhd;
        }
      }
    }

    return undefined;
  }
}
