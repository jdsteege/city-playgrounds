import { Component, OnInit, Input } from '@angular/core';
import { PlaygroundDef } from '../pg-list/pg-list.component';

@Component({
  selector: 'app-pg-card',
  templateUrl: './pg-card.component.html',
  styleUrls: ['./pg-card.component.scss'],
})
export class PgCardComponent implements OnInit {
  @Input() playground?: PlaygroundDef;

  constructor() {}

  ngOnInit(): void {}

  getParkWebsiteURL(): string {
    return (
      'https://www.ankenyiowa.gov/Home/Components/FacilityDirectory/FacilityDirectory/' +
      this.playground?.id.toString()
    );
  }

  getGoogleMapsURL(): string {
    const encodedNameAndAddress: string = encodeURIComponent(
      this.playground?.name + ', ' + this.playground?.address
    );
    return 'https://www.google.com/maps/search/' + encodedNameAndAddress;
  }
}