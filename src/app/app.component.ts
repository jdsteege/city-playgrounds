import { Component } from '@angular/core';
import { household } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'City Playgrounds';

  householdId: string = household.id;
  isLoggedIn: boolean = household?.id != null && household.id.length > 0;
}
