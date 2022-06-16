import { Component, OnInit, Input } from '@angular/core';
import { DateTime } from 'luxon';
import { HouseholdPgData } from '../models/household-pg-data';
import { PlaygroundDef } from '../models/playground-def';

@Component({
  selector: 'app-pg-card',
  templateUrl: './pg-card.component.html',
  styleUrls: ['./pg-card.component.scss'],
})
export class PgCardComponent implements OnInit {
  @Input() pgDef: PlaygroundDef = new PlaygroundDef();
  @Input() hhPgData: HouseholdPgData | null = null;

  constructor() {}

  ngOnInit(): void {}

  trimmedAddress(): string {
    const a = this.pgDef.address;
    return a.substring(0, a.indexOf('Ankeny, IA') - 1);
  }

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

  // standardizeDate(date: Date): Date {
  //   date.setUTCHours(11, 0, 0, 0);
  //   return date;
  // }

  getLastVisitString(): string {
    if (
      !this.hhPgData ||
      !this.hhPgData.last_visit ||
      this.hhPgData.last_visit == 0
    ) {
      return 'Never visited';
    }

    // let today: Date = this.standardizeDate(new Date());
    // let visit: Date = this.standardizeDate(new Date(this.hhPgData.last_visit));

    const visitDT: DateTime = DateTime.fromMillis(this.hhPgData.last_visit);
    let description: string = visitDT.toRelativeCalendar() ?? '';
    description = description.charAt(0).toUpperCase() + description.slice(1);

    return description;
  }
}
