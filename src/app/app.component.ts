import { Component } from '@angular/core';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'City Playgrounds';

  constructor(private databaseService: DatabaseService) {
    setTimeout(() => {
      this.initDropdown();
    }, 50);
  }

  getHouseholdId(): string {
    return this.databaseService.getHouseholdId();
  }

  initDropdown(): void {
    $('#top_menu_dropdown').dropdown({ action: 'hide' });
  }

  isLoggedIn(): boolean {
    return this.getHouseholdId().length > 0;
  }
}
