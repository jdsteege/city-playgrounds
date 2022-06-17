import { Component } from '@angular/core';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'City Playgrounds';
  db: DatabaseService;

  constructor(private databaseService: DatabaseService) {
    this.db = databaseService;

    setTimeout(() => {
      this.initDropdown();
    }, 50);
  }

  initDropdown(): void {
    $('#top_menu_dropdown').dropdown({ action: 'hide' });
  }
}
