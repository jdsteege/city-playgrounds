import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { HouseholdPgData } from '../models/household-pg-data';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private dbPath = '/households/steege_family';
  hhDataRef: AngularFireList<HouseholdPgData>;

  constructor(private db: AngularFireDatabase) {
    this.hhDataRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<HouseholdPgData> {
    return this.hhDataRef;
  }

  create(hhData: HouseholdPgData): any {
    return this.hhDataRef.push(hhData);
  }

  update(key: string, value: any): Promise<void> {
    return this.hhDataRef.update(key, value);
  }

  // delete(key: string): Promise<void> {
  //   return this.hhDataRef.remove(key);
  // }

  // deleteAll(): Promise<void> {
  //   return this.hhDataRef.remove();
  // }
}
