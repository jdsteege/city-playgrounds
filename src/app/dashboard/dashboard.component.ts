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
  household: Observable<any>;

  showAll: boolean = false;
  byPassport: boolean = false;

  constructor(private databaseService: DatabaseService) {
    this.household = this.databaseService.getHousehold().valueChanges();
  }

  ngOnInit(): void {
    navigator.geolocation?.watchPosition(
      (position: GeolocationPosition) => {
        this.playgroundDefs = PlaygroundDef.sortDefsByDistance(
          pgDefsJson.playgrounds,
          position.coords
        );
        this.nearestPgDef = this.playgroundDefs[0];
      },
      null,
      {
        enableHighAccuracy: false,
        timeout: Infinity,
        maximumAge: 60 * 1000,
      }
    );
  }
}
