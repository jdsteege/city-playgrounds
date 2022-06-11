import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { PlaygroundDef } from '../models/playground-def';
//
import pgDefsJson from '../../assets/ankeny_playgrounds.json';
import { Household } from '../models/household-pg-data';

@Component({
  selector: 'app-pg-list',
  templateUrl: './pg-list.component.html',
  styleUrls: ['./pg-list.component.scss'],
})
export class PgListComponent implements OnInit {
  playgroundDefs: PlaygroundDef[] = pgDefsJson.playgrounds;
  household: Household = new Household();
  filter: ListFilter = new ListFilter();

  constructor(private databaseService: DatabaseService) {
    this.databaseService
      .getHousehold()
      .snapshotChanges()
      .subscribe((action) => {
        this.household = action.payload.val() ?? new Household();
        this.onFilterChanged();
      });
  }

  ngOnInit(): void {
    navigator.geolocation?.watchPosition(
      (position: GeolocationPosition) => {
        this.playgroundDefs = PlaygroundDef.sortDefsByDistance(
          this.playgroundDefs,
          position.coords
        );
      },
      null,
      {
        enableHighAccuracy: false,
        timeout: Infinity,
        maximumAge: 60 * 1000,
      }
    );
  }

  setFilter(passportEmpty: boolean): void {
    this.filter = { passportEmpty };
    this.onFilterChanged();
  }

  onFilterChanged(): void {
    this.playgroundDefs = pgDefsJson.playgrounds;

    if (this.filter.passportEmpty && this.household.playgrounds) {
      this.playgroundDefs = this.playgroundDefs.filter(
        (def) =>
          this.household.playgrounds[def.id] == null ||
          this.household.playgrounds[def.id]?.passport.length == 0
      );
    }
  }
}

export class ListFilter {
  passportEmpty: boolean;

  constructor() {
    this.passportEmpty = false;
  }
}
