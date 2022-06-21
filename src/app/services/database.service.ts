import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Household, HouseholdPgData } from '../models/household-pg-data';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  isOnline: boolean = false;

  constructor(private db: AngularFireDatabase) {
    this.setupOnlineRef();

    if (!this.hasHousehold()) {
      db.database.goOffline();
    }
  }

  setupOnlineRef(): void {
    this.db
      .object('.info/connected')
      .snapshotChanges()
      .subscribe((data) => {
        this.isOnline = Boolean(data.payload.val());
        // console.log('isOnline: ' + this.isOnline);
      });
  }

  toggleConnection(): void {
    if (this.isOnline) {
      this.db.database.goOffline();
    } else {
      this.db.database.goOnline();
    }
  }

  isConnected(): boolean {
    return this.hasHousehold() && this.isOnline;
  }

  getHousehold(): AngularFireObject<Household> {
    return this.db.object('/households/' + this.getHouseholdId());
  }

  get(pgId: string): AngularFireObject<HouseholdPgData> {
    return this.db.object(
      '/households/' + this.getHouseholdId() + '/playgrounds/' + pgId
    );
  }

  update(pgId: string, value: any): Promise<void> {
    return this.db
      .object('/households/' + this.getHouseholdId() + '/playgrounds/' + pgId)
      .update(value);
  }

  hasHousehold(): boolean {
    return (localStorage.getItem('householdId') ?? '').length > 0;
  }

  getHouseholdId(): string {
    if (!this.hasHousehold()) {
      return 'offline';
    } else {
      return localStorage.getItem('householdId') ?? 'offline';
    }
  }

  setHouseholdId(id: string): void {
    localStorage.setItem('householdId', id);
    if (this.hasHousehold()) {
      this.db.database.goOnline();
    } else {
      this.db.database.goOffline();
    }
  }
}
