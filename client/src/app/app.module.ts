import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MarkerService } from './services/marker/marker.service';
import { PopUpService } from './services/pop-up/pop-up.service';

import { MapComponent } from './components/map/map.component';
import { AddStructureComponent } from './components/add-structure/add-structure.component';
import { HomeComponent } from './components/home/home.component';
import { ViewStructureComponent } from './components/view-structure/view-structure.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { ViewEventComponent } from './components/view-event/view-event.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import {RegisterComponent} from "./components/register/register.component";
import { LogoutComponent } from './components/logout/logout.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    AddStructureComponent,
    HomeComponent,
    ViewStructureComponent,
    AddEventComponent,
    ViewEventComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [
    MarkerService,
    PopUpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
