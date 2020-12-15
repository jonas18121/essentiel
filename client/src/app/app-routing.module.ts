import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddStructureComponent } from "./components/add-structure/add-structure.component";
import { HomeComponent } from "./components/home/home.component";
import { ViewStructureComponent } from "./components/view-structure/view-structure.component";
import {AddEventComponent} from "./components/add-event/add-event.component";
import {ViewEventComponent} from "./components/view-event/view-event.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'add/structure', component: AddStructureComponent},
  { path: 'structure/:structureName/:structureId', component: ViewStructureComponent},
  { path: 'add/event', component: AddEventComponent},
  { path: 'event/:eventName/:eventId', component: ViewEventComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' }, // redirect to `home`
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
