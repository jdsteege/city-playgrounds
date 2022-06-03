import { Component, OnInit } from '@angular/core';
// import pgDataRaw from '../../assets/ankeny_playgrounds.json';
import { DatabaseService } from 'src/app/services/database.service';
import { PlaygroundDef } from 'src/app/models/playground-def';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pg-list',
  templateUrl: './pg-list.component.html',
  styleUrls: ['./pg-list.component.scss'],
})
export class PgListComponent implements OnInit {
  // pgData: PlaygroundDef[] = pgDataRaw.playgrounds;

  playgrounds?: PlaygroundDef[];

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
        this.playgrounds = data;
      });
  }
}
