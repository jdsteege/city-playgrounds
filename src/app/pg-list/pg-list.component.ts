import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { PlaygroundDef } from '../models/playground-def';
import { Household, HouseholdPgData } from '../models/household-pg-data';
//
import pgDefsJson from '../../assets/ankeny_playgrounds.json';

@Component({
  selector: 'app-pg-list',
  templateUrl: './pg-list.component.html',
  styleUrls: ['./pg-list.component.scss'],
})
export class PgListComponent implements OnInit, OnChanges {
  playgroundDefs: PlaygroundDef[] = pgDefsJson.playgrounds;
  household: Household = new Household();
  @Input() geoCoords: GeolocationCoordinates | undefined;
  //
  filter: ListFilter = new ListFilter();
  sort: string = 'Nearest';

  constructor(private databaseService: DatabaseService) {
    this.databaseService
      .getHousehold()
      .snapshotChanges()
      .subscribe((action) => {
        this.household = action.payload.val() ?? new Household();
        this.onConditionsChanged();
      });
  }

  ngOnInit(): void {
    // navigator.geolocation?.watchPosition(
    //   (position: GeolocationPosition) => {
    //     this.geoCoords = position.coords;
    //     this.onConditionsChanged();
    //   },
    //   null,
    //   {
    //     enableHighAccuracy: false,
    //     timeout: Infinity,
    //     maximumAge: 60 * 1000,
    //   }
    // );

    setTimeout(() => {
      this.scrollToTargetAdjusted('listFilters');
    }, 50);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['geoCoords'] != null) {
      // console.log(
      //   'previousValue ' + changes['geoCoords'].previousValue?.latitude
      // );
      // console.log('currentValue ' + changes['geoCoords'].currentValue.latitude);

      this.onConditionsChanged();
    }
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

  onConditionsChanged(): void {
    // console.log('onConditionsChanged');

    this.playgroundDefs = pgDefsJson.playgrounds;

    // Filter
    if (this.filter.passportEmpty && this.household.playgrounds) {
      this.playgroundDefs = this.playgroundDefs.filter(
        (def) =>
          this.household.playgrounds[def.id] == null ||
          this.household.playgrounds[def.id]?.passport.length == 0
      );
    }

    // Sort
    if (this.geoCoords) {
      // First sort by distance, to break ties in other sorts.
      this.playgroundDefs = PlaygroundDef.sortDefsByDistance(
        this.playgroundDefs,
        this.geoCoords
      );
    }
    if (this.sort == 'VisitDate' && this.household) {
      this.playgroundDefs = this.playgroundDefs.sort((a, b) => {
        let aHhPg: HouseholdPgData = this.household.playgrounds[a.id];
        let bHhPg: HouseholdPgData = this.household.playgrounds[b.id];
        let aVisit: number = aHhPg?.last_visit ?? 0;
        let bVisit: number = bHhPg?.last_visit ?? 0;

        return aVisit - bVisit;
      });
    }
  }

  setFilter(passportEmpty: boolean): void {
    if (this.filter.passportEmpty == passportEmpty) {
      return;
    }

    this.filter = { passportEmpty };
    this.onConditionsChanged();
  }

  setSort(sort: string): void {
    if (this.sort == sort) {
      return;
    }

    this.sort = sort;
    this.onConditionsChanged();
  }
}

export class ListFilter {
  passportEmpty: boolean;

  constructor() {
    this.passportEmpty = false;
  }
}
