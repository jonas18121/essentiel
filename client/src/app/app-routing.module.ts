import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddStructureComponent } from "./components/add-structure/add-structure.component";
import { HomeComponent } from "./components/home/home.component";
import { ViewStructureComponent } from "./components/view-structure/view-structure.component";
import {AddEventComponent} from "./components/add-event/add-event.component";
import {ViewEventComponent} from "./components/view-event/view-event.component";
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {LogoutComponent} from "./components/logout/logout.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'add/structure', component: AddStructureComponent, canActivate:[] },
  { path: 'structure/:structureName/:structureId', component: ViewStructureComponent },
  { path: 'add/event', component: AddEventComponent, canActivate:[] },
  { path: 'event/:eventName/:eventId', component: ViewEventComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: RegisterComponent},
  { path: 'logout', component: LogoutComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }, // redirect to `home`
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
