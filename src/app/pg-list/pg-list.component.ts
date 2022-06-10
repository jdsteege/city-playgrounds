import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges,
} from '@angular/core';
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
export class PgListComponent implements OnInit, OnChanges {
  playgroundDefs: PlaygroundDef[] = pgDefsJson.playgrounds;
  household: Household = new Household();
  @Input() filterByPassport: boolean = false;

  constructor(private databaseService: DatabaseService) {
    this.databaseService
      .getHousehold()
      .snapshotChanges()
      .subscribe((action) => {
        this.household = action.payload.val() ?? new Household();
        this.doFilter();
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

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName === 'filterByPassport') {
        this.doFilter();
      }
    }
  }

  doFilter(): void {
    if (this.filterByPassport) {
      this.playgroundDefs = this.playgroundDefs.filter(
        (def) =>
          this.household.playgrounds[def.id] == null ||
          this.household.playgrounds[def.id]?.passport.length == 0
      );
    }
  }
}
