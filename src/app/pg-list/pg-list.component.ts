import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { PlaygroundDef } from '../models/playground-def';
import { Household } from '../models/household-pg-data';
//
import pgDefsJson from '../../assets/ankeny_playgrounds.json';

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

    setTimeout(() => {
      this.scrollToTargetAdjusted('listFilters');
    }, 50);
  }

  // https://stackoverflow.com/a/49860927/19036171
  scrollToTargetAdjusted(targetId: string): void {
    const element = document.getElementById(targetId);
    if (!element) {
      return;
    }
    const headerOffset = 50;
    const elementPosition = element?.getBoundingClientRect().top ?? 0;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
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
