import { Component, OnInit } from '@angular/core';
import pgDataRaw from '../../assets/ankeny_playgrounds.json';

export interface PlaygroundDef {
  id: number;
  name: string;
  imageUrl: string;
  address: string;
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-pg-list',
  templateUrl: './pg-list.component.html',
  styleUrls: ['./pg-list.component.scss'],
})
export class PgListComponent implements OnInit {
  pgData: PlaygroundDef[] = pgDataRaw;

  constructor() {}

  ngOnInit(): void {}
}
