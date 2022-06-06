import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Household, HouseholdPgData } from '../models/household-pg-data';

export var household: any = { id: localStorage.getItem('householdId') };

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private db: AngularFireDatabase) {}

  hasHousehold(): boolean {
    return household?.id != null && household?.id?.length > 0;
  }

  getHousehold(): AngularFireObject<Household> {
    return this.db.object('/households/' + household.id);
  }

  get(pgId: string): AngularFireObject<HouseholdPgData> {
    return this.db.object(
      '/households/' + household.id + '/playgrounds/' + pgId
    );
  }

  update(pgId: string, value: any): Promise<void> {
    return this.db
      .object('/households/' + household.id + '/playgrounds/' + pgId)
      .update(value);
  }

  // update(key: string, value: any): Promise<void> {
  //   return this.hhDataList.update(key, value);
  // }

  // create(hhData: HouseholdPgData): any {
  //   return this.hhDataRef.push(hhData);
  // }

  // delete(key: string): Promise<void> {
  //   return this.hhDataRef.remove(key);
  // }

  // deleteAll(): Promise<void> {
  //   return this.hhDataRef.remove();
  // }
}
