import { Component, OnInit, Input } from '@angular/core';
import { Household, HouseholdPgData } from '../models/household-pg-data';
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

  // getHhPgData(): HouseholdPgData | undefined {
  //   if (this.household?.playgrounds) {
  //     return this.household.playgrounds[this.pgDef.id];
  //   }
  //   return undefined;
  // }

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
}
