import { Component } from '@angular/core';
import { DatabaseService } from './services/database.service';
import { LocationService } from './services/location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'City Playgrounds';
  householdId: string;

  constructor(
    private databaseService: DatabaseService,
    private locationService: LocationService
  ) {
    this.householdId = this.databaseService.getHouseholdId();
  }

  isLoggedIn(): boolean {
    return this.householdId.length > 0;
  }
}
