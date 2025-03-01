import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
   { path: '', component: HomeComponent },
  { path: 'user/:id', component: UserComponent }, // Add page param to UserComponent route
];
