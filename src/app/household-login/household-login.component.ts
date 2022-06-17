import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-household-login',
  templateUrl: './household-login.component.html',
  styleUrls: ['./household-login.component.scss'],
})
export class HouseholdLoginComponent implements OnInit {
  hhidInput: string;

  constructor(
    private router: Router,
    private databaseService: DatabaseService
  ) {
    this.hhidInput = this.databaseService.getHouseholdId();
    if (this.hhidInput == 'offline') {
      this.hhidInput = '';
    }
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.hhidInput = this.hhidInput.toLowerCase();
    this.databaseService.setHouseholdId(this.hhidInput);
    this.router.navigateByUrl('/');
  }
}
