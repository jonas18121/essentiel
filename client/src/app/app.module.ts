import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';

import { MarkerService } from './services/marker/marker.service';
import { HttpClientModule } from '@angular/common/http';

import { PopUpService } from './services/pop-up/pop-up.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddStructureComponent } from './components/add-structure/add-structure.component';
import { HomeComponent } from './components/home/home.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ViewStructureComponent } from './components/view-structure/view-structure.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    AddStructureComponent,
    HomeComponent,
    ViewStructureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    MarkerService,
    PopUpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
