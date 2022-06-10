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
  private householdId: string = localStorage.getItem('householdId') ?? '';

  constructor(private db: AngularFireDatabase) {}

  hasHousehold(): boolean {
    return this.householdId.length > 0;
  }

  getHousehold(): AngularFireObject<Household> {
    return this.db.object('/households/' + this.householdId);
  }

  get(pgId: string): AngularFireObject<HouseholdPgData> {
    return this.db.object(
      '/households/' + this.householdId + '/playgrounds/' + pgId
    );
  }

  update(pgId: string, value: any): Promise<void> {
    return this.db
      .object('/households/' + this.householdId + '/playgrounds/' + pgId)
      .update(value);
  }

  getHouseholdId(): string {
    return this.householdId;
  }

  setHouseholdId(id: string): void {
    this.householdId = id;
  }
}
