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
  constructor(private db: AngularFireDatabase) {}

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
      return 'default';
    } else {
      return localStorage.getItem('householdId') ?? 'default';
    }
  }

  setHouseholdId(id: string): void {
    localStorage.setItem('householdId', id);
  }
}
