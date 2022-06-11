import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HouseholdPgData } from '../models/household-pg-data';
import { PlaygroundDef } from '../models/playground-def';
import { DatabaseService } from '../services/database.service';
//
import pgDefsJson from '../../assets/ankeny_playgrounds.json';
import { Observable, Subscription } from 'rxjs';
import { AngularFireObject } from '@angular/fire/compat/database';

@Component({
  selector: 'app-edit-household-data',
  templateUrl: './edit-household-data.component.html',
  styleUrls: ['./edit-household-data.component.scss'],
})
export class EditHouseholdDataComponent implements OnInit, OnDestroy {
  playgroundId: string = '';
  playgroundDefs: PlaygroundDef[] = pgDefsJson.playgrounds;
  pgDef: PlaygroundDef;
  dataRef: AngularFireObject<HouseholdPgData>;
  subscription: Subscription;

  // Use this for any async piping in template.
  // hhPgData: Observable<HouseholdPgData | null>;

  submitted: boolean = false;
  passport: string = '';
  nickname: string = '';
  notes: string = '';

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private databaseService: DatabaseService
  ) {
    this.playgroundId = this.route.snapshot.paramMap.get('pgid') ?? '';

    this.pgDef = new PlaygroundDef();
    for (const pgd of this.playgroundDefs) {
      if (pgd.id == this.playgroundId) {
        this.pgDef = pgd;
      }
    }

    this.dataRef = this.databaseService.get(this.playgroundId);
    this.subscription = this.dataRef.snapshotChanges().subscribe((data) => {
      this.passport = data.payload.val()?.passport ?? '';
      this.nickname = data.payload.val()?.nickname ?? '';
      this.notes = data.payload.val()?.notes ?? '';
    });
    // this.hhPgData = afo.valueChanges();
  }

  onSubmit(): void {
    this.submitted = true;

    this.databaseService.update(this.playgroundId, {
      passport: this.passport,
      nickname: this.nickname,
      notes: this.notes,
      last_visit: Date.now(),
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goBack(): void {
    this.location.back();
  }

  getGoogleMapsURL(): string {
    const encodedNameAndAddress: string = encodeURIComponent(
      this.pgDef?.name + ', ' + this.pgDef?.address
    );
    return 'https://www.google.com/maps/search/' + encodedNameAndAddress;
  }
}
