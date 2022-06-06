import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { household } from '../services/database.service';

@Component({
  selector: 'app-household-login',
  templateUrl: './household-login.component.html',
  styleUrls: ['./household-login.component.scss'],
})
export class HouseholdLoginComponent implements OnInit {
  hhidInput: string = household.id;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    household.id = this.hhidInput;
    localStorage.setItem('householdId', household.id);
    this.router.navigateByUrl('/');
  }
}
