import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { PlaygroundDef } from '../models/playground-def';
//
import pgDefsJson from '../../assets/ankeny_playgrounds.json';
import { Observable } from 'rxjs';
import { Household } from '../models/household-pg-data';
import { LocationService } from '../services/location.service';

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

  constructor(
    private databaseService: DatabaseService,
    private locationService: LocationService
  ) {
    this.household = this.databaseService.getHousehold().valueChanges();
  }

  ngOnInit(): void {
    this.playgroundDefs = PlaygroundDef.sortDefsByDistance(
      this.playgroundDefs,
      this.locationService
    );

    this.nearestPgDef = this.playgroundDefs[0];
  }
}
