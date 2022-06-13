import { Component, OnInit, Input } from '@angular/core';
import { HouseholdPgData } from '../models/household-pg-data';
import { PlaygroundDef } from '../models/playground-def';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss'],
})
export class CheckInComponent implements OnInit {
  @Input() pgDef: PlaygroundDef = new PlaygroundDef();
  @Input() hhPgData: HouseholdPgData | null = null;

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {}

  showModal(): void {
    $('#modal_visit_date')
      .modal({
        autofocus: false,
      })
      .modal('show');
    (<any>$('#visit_date_calendar')).calendar({
      selectAdjacentDays: true,
      type: 'date',
      today: true,
      on: 'click',
    });
    (<any>$('#visit_date_calendar')).calendar(
      (this.hhPgData?.last_visit ?? 0) > 0 ? 'set date' : 'clear',
      new Date(this.hhPgData?.last_visit ?? 0),
      true,
      false
    );
  }

  clearVisitDate(): void {
    (<any>$('#visit_date_calendar')).calendar('clear');
  }

  todayVisitDate(): void {
    (<any>$('#visit_date_calendar')).calendar(
      'set date',
      new Date(),
      true,
      true
    );
  }

  continue(): void {
    let userVisitDate: Date | null = (<any>$('#visit_date_calendar')).calendar(
      'get date'
    );
    let userLastVisit: number = userVisitDate ? userVisitDate.getTime() : 0;

    this.databaseService.update(this.pgDef.id, {
      last_visit: userLastVisit,
    });
  }
}
