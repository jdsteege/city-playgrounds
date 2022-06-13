import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { PlaygroundDef } from '../models/playground-def';
//
import pgDefsJson from '../../assets/ankeny_playgrounds.json';
import { Observable, Subscription } from 'rxjs';
import { Household, HouseholdPgData } from '../models/household-pg-data';
import { AngularFireObject } from '@angular/fire/compat/database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private playgroundDefs: PlaygroundDef[] = pgDefsJson.playgrounds;
  nearestPgDef: PlaygroundDef = pgDefsJson.playgrounds[0];
  nearestDistance: number = 0;

  private hhPgSub: Subscription | undefined = undefined;
  householdPlaygroundData: HouseholdPgData | null = null;

  showList: boolean = false;

  constructor(private databaseService: DatabaseService) {}

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

  ngOnDestroy(): void {
    this.hhPgSub?.unsubscribe();
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

    this.hhPgSub = this.databaseService
      .get(this.nearestPgDef.id)
      .snapshotChanges()
      .subscribe((data) => {
        this.householdPlaygroundData = data.payload.val();
      });
  }
}
