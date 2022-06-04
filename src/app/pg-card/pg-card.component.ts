import { Component, OnInit, Input } from '@angular/core';
import { HouseholdPgData } from '../models/household-pg-data';
import { PlaygroundDef } from '../models/playground-def';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-pg-card',
  templateUrl: './pg-card.component.html',
  styleUrls: ['./pg-card.component.scss'],
})
export class PgCardComponent implements OnInit {
  @Input() pgDef?: PlaygroundDef;
  @Input() hhData?: HouseholdPgData;

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {}

  getParkWebsiteURL(): string {
    return (
      'https://www.ankenyiowa.gov/Home/Components/FacilityDirectory/FacilityDirectory/' +
      this.pgDef?.id?.toString()
    );
  }

  getGoogleMapsURL(): string {
    const encodedNameAndAddress: string = encodeURIComponent(
      this.pgDef?.name + ', ' + this.pgDef?.address
    );
    return 'https://www.google.com/maps/search/' + encodedNameAndAddress;
  }
}
