import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { PlaygroundDef } from '../models/playground-def';
//
import pgDefsJson from '../../assets/ankeny_playgrounds.json';
import { Observable } from 'rxjs';
import { Household } from '../models/household-pg-data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  playgroundDefs: PlaygroundDef[] = pgDefsJson.playgrounds;
  nearestPgDef: PlaygroundDef | null = null;
  nearestDistance: number = 0;
  household: Observable<any>;

  showAll: boolean = false;
  byPassport: boolean = false;

  constructor(private databaseService: DatabaseService) {
    this.household = this.databaseService.getHousehold().valueChanges();
  }

  ngOnInit(): void {
    navigator.geolocation?.watchPosition(
      (position: GeolocationPosition) => {
        this.findNearest(position.coords);
      },
      null,
      {
        enableHighAccuracy: false,
        timeout: Infinity,
        maximumAge: 60 * 1000,
      }
    );
  }

  private findNearest(coords: GeolocationCoordinates): void {
    let result: PlaygroundDef = pgDefsJson.playgrounds[0];
    let minDist: number = PlaygroundDef.distanceToCoords(result, coords);

    for (const current of pgDefsJson.playgrounds) {
      let curDist: number = PlaygroundDef.distanceToCoords(current, coords);

      if (curDist < minDist) {
        result = current;
        minDist = curDist;
      }
    }

    this.nearestPgDef = result;
    this.nearestDistance = minDist;
  }
}
