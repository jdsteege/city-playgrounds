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
  @Input() compact: boolean = false;
  private geoCoords: GeolocationCoordinates | undefined;

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {
    navigator.geolocation?.getCurrentPosition(
      (position: GeolocationPosition) => {
        this.geoCoords = position.coords;
      },
      null,
      {
        enableHighAccuracy: false,
        timeout: Infinity,
        maximumAge: 60 * 1000,
      }
    );
  }

  hideModal(event: HashChangeEvent): void {
    // console.log(event.oldURL);
    if (event.oldURL.includes('#modal')) {
      // console.log('hiding');
      (<any>$('.ui.modal')).modal('hide');
    }
  }

  showModal(): void {
    let modalContent: string =
      `
      <div class="description">
        <form class="ui form">
          <div class="field">
            <label><i class="calendar day icon"></i> Visit Date</label>
            <div class="ui calendar" id="visit_date_calendar">
              <div
                class="ui input left icon"
                style="margin: 0rem 1rem 1rem 0rem; width: fit-content"
              >
                <i class="calendar alternate icon"></i>
                <input type="text" placeholder="Date" id="visit_date_input" />
              </div>
              <button
                class="ui mini basic circular icon button"
                type="button"
                tabindex="-1"
                id="visit_date_clear_button"
              >
                <i class="times icon"></i>
              </button>
            </div>
          </div>
          <div class="field">
            <label><i class="plane icon"></i> Passport</label>
            <div class="ui input">
              <input type="text" placeholder="Passport code" id="passport_input" autocomplete="off" value="` +
      (this.hhPgData?.passport ?? '') +
      `" />
            </div>
          </div>
          <div class="field">
            <label><i class="sticky note icon"></i> Notes</label>
            <div class="ui input">
              <input type="text" placeholder="Notes" id="notes_input" autocomplete="off" value="` +
      (this.hhPgData?.notes ?? '') +
      `" />
            </div>
          </div>
          <div class="field">
            <label><i class="comment icon"></i> Nickname</label>
            <div class="ui input">
              <input type="text" placeholder="Nickname" id="nickname_input" autocomplete="off" value="` +
      (this.hhPgData?.nickname ?? '') +
      `" />
            </div>
          </div>
        </form>
      </div>`;

    (<any>$('body'))
      .modal({
        class: 'tiny',
        centered: false,
        autofocus: false,
        duration: 0,
        title: this.pgDef.name,
        content: modalContent,
        actions: [
          {
            text: 'Cancel',
            class: 'cancel',
          },
          {
            text: 'Done',
            class: 'ok primary right labeled icon',
            click: () => {
              this.submit();
            },
            icon: 'angle right',
          },
        ],
      })
      .modal('show');

    (<any>$('#visit_date_calendar')).calendar({
      selectAdjacentDays: true,
      type: 'date',
      today: true,
      on: 'click',
    });

    (<any>$('#visit_date_calendar')).calendar(
      'set date',
      this.defaultVisitDate(),
      true,
      false
    );

    $('#visit_date_clear_button').on('click', () => {
      this.clearVisitDate();
    });

    // Close modal on browser back button
    location.hash = 'modal';
    addEventListener('hashchange', this.hideModal);
  }

  defaultVisitDate(): Date {
    let result: Date = new Date();
    let distance = PlaygroundDef.distanceToCoords(this.pgDef, this.geoCoords);
    // console.log(distance + ' miles');

    if (
      distance > 0.2 &&
      this.hhPgData?.last_visit &&
      this.hhPgData?.last_visit > 0
    ) {
      // User is not at playground
      result = new Date(this.hhPgData?.last_visit);
    }

    return result;
  }

  // showModal(): void {
  //   $('#modal_check_in')
  //     .modal({
  //       autofocus: false,
  //       duration: 0,
  //     })
  //     .modal('show');
  //   (<any>$('#visit_date_calendar')).calendar({
  //     selectAdjacentDays: true,
  //     type: 'date',
  //     today: true,
  //     on: 'click',
  //   });
  //   (<any>$('#visit_date_calendar')).calendar(
  //     'set date',
  //     new Date(),
  //     true,
  //     false
  //   );

  //   $('#passport_input').val(this.hhPgData?.passport ?? '');
  //   $('#notes_input').val(this.hhPgData?.notes ?? '');
  //   $('#nickname_input').val(this.hhPgData?.nickname ?? '');
  // }

  clearVisitDate(): void {
    (<any>$('#visit_date_calendar')).calendar('clear');
  }

  // todayVisitDate(): void {
  //   (<any>$('#visit_date_calendar')).calendar(
  //     'set date',
  //     new Date(),
  //     true,
  //     true
  //   );
  // }

  submit(): void {
    let userCalendarDate: Date | null = (<any>(
      $('#visit_date_calendar')
    )).calendar('get date');
    let userLastVisit: number = userCalendarDate
      ? userCalendarDate.getTime()
      : 0;

    let userPassport: string = $('#passport_input').val()?.toString() ?? '';

    let userNotes: string = $('#notes_input').val()?.toString() ?? '';

    let userNickname: string = $('#nickname_input').val()?.toString() ?? '';

    //
    this.databaseService.update(this.pgDef.id, {
      last_visit: userLastVisit,
      nickname: userNickname,
      notes: userNotes,
      passport: userPassport,
    });
  }
}
