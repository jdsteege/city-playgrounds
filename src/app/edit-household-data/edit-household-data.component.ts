import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HouseholdPgData } from '../models/household-pg-data';
import { PlaygroundDef } from '../models/playground-def';
import { map } from 'rxjs/operators';
import { DatabaseService } from '../services/database.service';
//
import pgDefsJson from '../../assets/ankeny_playgrounds.json';

@Component({
  selector: 'app-edit-household-data',
  templateUrl: './edit-household-data.component.html',
  styleUrls: ['./edit-household-data.component.scss'],
})
export class EditHouseholdDataComponent implements OnInit {
  playgroundId: string = '';
  playgroundDefs: PlaygroundDef[] = pgDefsJson.playgrounds;
  pgDef?: PlaygroundDef;
  hhData?: HouseholdPgData;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private databaseService: DatabaseService
  ) {}

  ngOnInit(): void {
    this.playgroundId = this.route.snapshot.paramMap.get('pgid') ?? '';

    for (const pgd of this.playgroundDefs) {
      if (pgd.id == this.playgroundId) {
        this.pgDef = pgd;
      }
    }

    this.retrieveHHData();
  }

  retrieveHHData(): void {
    // this.hhData = this.databaseService.get(this.playgroundId).valueChanges();
  }

  goBack(): void {
    this.location.back();
  }

  doSubmit(): void {}
}
