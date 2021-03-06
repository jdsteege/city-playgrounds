import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditHouseholdDataComponent } from './edit-household-data/edit-household-data.component';
import { HouseholdLoginComponent } from './household-login/household-login.component';
import { PassportListComponent } from './passport-list/passport-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: HouseholdLoginComponent },
  { path: 'passport-list', component: PassportListComponent },
  { path: 'edit/:pgid', component: EditHouseholdDataComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
