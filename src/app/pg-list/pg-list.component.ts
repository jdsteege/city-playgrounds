import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { PlaygroundDef } from '../models/playground-def';
import pgDefsJson from '../../assets/ankeny_playgrounds.json';
import { HouseholdPgData } from 'src/app/models/household-pg-data';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pg-list',
  templateUrl: './pg-list.component.html',
  styleUrls: ['./pg-list.component.scss'],
})
export class PgListComponent implements OnInit {
  playgroundDefs: PlaygroundDef[] = pgDefsJson.playgrounds;
  allHouseholdData?: HouseholdPgData[];

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.retrievePlaygrounds();
  }

  retrievePlaygrounds(): void {
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
