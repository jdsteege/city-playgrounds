import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Household, HouseholdPgData } from '../models/household-pg-data';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private db: AngularFireDatabase) {}

  getHousehold(): AngularFireObject<Household> {
    return this.db.object('/households/steege_family');
  }

  get(pgId: string): AngularFireObject<HouseholdPgData> {
    return this.db.object('/households/steege_family/' + pgId);
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
