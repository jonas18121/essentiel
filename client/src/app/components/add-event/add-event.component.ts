import { Component, OnInit } from '@angular/core';
import { Event } from "../../models/event/event";
import { Router } from "@angular/router";
import { FormBuilder, ReactiveFormsModule} from "@angular/forms";
import { EventService } from "../../services/event/event.service";
import {TokenStorageService} from "../../services/auth/token-storage.service";
import {Address} from "../../models/address/address";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {GeolocalisationService} from "../../services/geolocalisation/geolocalisation.service";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  result: any;
  roles: string[];
  authority: string;

  eventToAdd: Event;
  lastkeydown1: number = 0;
  addressList: [];

  eventForm = this.fb.group({
    name: [''],
    date: [''],
    hour: [''],
    street: [''],
    city: [''],
    zip: [''],
    structure: [''],
    public: [''],
    price: [''],
    lon: [''],
    lat: ['']
  });

  constructor(
    private router: Router,
    private eventService: EventService,
    private geolocalisationService: GeolocalisationService,
    private fb: FormBuilder,
    private http: HttpClient,
    private tokenStorage: TokenStorageService) {
    this.eventToAdd = new Event();
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_PM') {
          this.authority = 'pm';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
    if (!this.authority) {
      this.gotoHome();
    }
  }

  onSubmit(): void {
    let currentAddress = new Address();
    this.eventToAdd.name = this.eventForm.value.name;
    currentAddress.city = this.eventForm.value.city;
    currentAddress.street = this.eventForm.value.street;
    currentAddress.postalcode = this.eventForm.value.zip;
    currentAddress.country = "France";
    this.eventToAdd.longitude = this.eventForm.value.lon;
    this.eventToAdd.latitude = this.eventForm.value.lat;
    if (this.eventToAdd.name && this.eventToAdd.longitude && this.eventToAdd.latitude)
      this.eventService.save(this.eventToAdd).subscribe(() => this.gotoHome());
    else
      console.log("Name, address or coordinates empty...");
  }

  gotoHome(): void {
    this.router.navigate(['/home']);
  }

  public getAddress($event) {
    let address = (<HTMLInputElement>document.getElementById('address')).value;
    this.addressList = [];
    if (address.length > 2 && $event.timeStamp - this.lastkeydown1 > 200) {
      this.geolocalisationService.search(address).subscribe(response => {
        this.addressList = response["features"];
        this.eventForm.controls['street'].setValue(response["features"][0]["properties"]["name"]);
        this.eventForm.controls['city'].setValue(response["features"][0]["properties"]["city"]);
        this.eventForm.controls['zip'].setValue(response["features"][0]["properties"]["postcode"]);
        this.eventForm.controls['lon'].setValue(response["features"][0]["geometry"]["coordinates"][0]);
        this.eventForm.controls['lat'].setValue(response["features"][0]["geometry"]["coordinates"][1]);
        this.lastkeydown1 = $event.timeStamp;
      });
    }
  }
}
