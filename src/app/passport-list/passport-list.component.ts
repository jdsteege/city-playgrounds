import { Component, OnInit } from '@angular/core';
import { Household } from '../models/household-pg-data';
import { PlaygroundDef } from '../models/playground-def';
import pgDefsJson from '../../assets/ankeny_playgrounds.json';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-passport-list',
  templateUrl: './passport-list.component.html',
  styleUrls: ['./passport-list.component.scss'],
})
export class PassportListComponent implements OnInit {
  playgroundDefs: PlaygroundDef[] = pgDefsJson.playgrounds;
  household: Household = new Household();

  constructor(private databaseService: DatabaseService) {
    this.databaseService
      .getHousehold()
      .snapshotChanges()
      .subscribe((action) => {
        this.household = action.payload.val() ?? new Household();
      });
  }

  ngOnInit(): void {}
}
