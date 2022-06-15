import { Component } from '@angular/core';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'City Playgrounds';
  householdId: string;

  constructor(private databaseService: DatabaseService) {
    this.householdId = this.databaseService.getHouseholdId();

    setTimeout(() => {
      this.initDropdown();
    }, 50);
  }

  initDropdown(): void {
    $('#top_menu_dropdown').dropdown({ action: 'hide' });
  }

  isLoggedIn(): boolean {
    return this.householdId.length > 0;
  }
}
