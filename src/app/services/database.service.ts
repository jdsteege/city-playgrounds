import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { PlaygroundDef } from '../models/playground-def';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private dbPath = '/playgrounds';
  playgroundsRef: AngularFireList<PlaygroundDef>;
  constructor(private db: AngularFireDatabase) {
    this.playgroundsRef = db.list(this.dbPath);
  }
  getAll(): AngularFireList<PlaygroundDef> {
    return this.playgroundsRef;
  }
  create(playground: PlaygroundDef): any {
    return this.playgroundsRef.push(playground);
  }
  update(key: string, value: any): Promise<void> {
    return this.playgroundsRef.update(key, value);
  }
  delete(key: string): Promise<void> {
    return this.playgroundsRef.remove(key);
  }
  deleteAll(): Promise<void> {
    return this.playgroundsRef.remove();
  }
}
