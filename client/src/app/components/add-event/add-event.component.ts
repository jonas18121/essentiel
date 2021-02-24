import { Component, OnInit } from '@angular/core';
import { Event } from "../../models/event/event";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, ReactiveFormsModule} from "@angular/forms";
import { EventService } from "../../services/event/event.service";
import {TokenStorageService} from "../../services/auth/token-storage.service";
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

  sub: any;
  eventToEditId: number;

  eventForm = this.fb.group({
    name: [''],
    date: [''],
    hour: [''],
    street: [''],
    city: [''],
    zip: [''],
    address: [''],
    structure: [''],
    public: [''],
    price: [''],
    lon: [''],
    lat: ['']
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
    this.sub = this.route.queryParams.subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.eventToEditId = params['id'] || 0;
    });
    if (this.eventToEditId != 0) {
      this.eventService.findById(this.eventToEditId).subscribe(data => {
        this.eventForm.controls['name'].setValue(data.name);
        this.eventForm.controls['date'].setValue(data.date);
        this.eventForm.controls['hour'].setValue(data.hour);
        let address = data.street + " " + data.zip + " " + data.city;
        this.eventForm.controls['address'].setValue(address);
        this.geolocalisationService.search(address).subscribe(response => {
          this.addressList = response["features"];
          this.eventForm.controls['street'].setValue(response["features"][0]["properties"]["name"]);
          this.eventForm.controls['city'].setValue(response["features"][0]["properties"]["city"]);
          this.eventForm.controls['zip'].setValue(response["features"][0]["properties"]["postcode"]);
          this.eventForm.controls['lon'].setValue(response["features"][0]["geometry"]["coordinates"][0]);
          this.eventForm.controls['lat'].setValue(response["features"][0]["geometry"]["coordinates"][1]);
        });

        this.eventForm.controls['structure'].setValue(data.organizer);
        this.eventForm.controls['public'].setValue(data.audience);
        this.eventForm.controls['price'].setValue(data.price);
      }, error => {
        this.gotoHome();
      }) ;
    }
  }

  onSubmit(): void {
    this.eventToAdd.name = this.eventForm.value.name;
    this.eventToAdd.date = this.eventForm.value.date;
    this.eventToAdd.hour = this.eventForm.value.hour;
    this.eventToAdd.city = this.eventForm.value.city;
    this.eventToAdd.street = this.eventForm.value.street;
    this.eventToAdd.zip = this.eventForm.value.zip;
    this.eventToAdd.longitude = this.eventForm.value.lon;
    this.eventToAdd.latitude = this.eventForm.value.lat;
    this.eventToAdd.price = this.eventForm.value.price;
    this.eventToAdd.audience = this.eventForm.value.public;
    console.log(this.eventToAdd);
    if (this.eventToAdd.name && this.eventToAdd.longitude && this.eventToAdd.latitude) {
      if (this.eventToEditId != 0) {
        this.eventService.update(this.eventToEditId, this.eventToAdd).subscribe(() => this.gotoHome());
      }else{
        this.eventService.save(this.eventToAdd).subscribe(() => this.gotoHome());
      }
    }else{
      console.log("Name, address or coordinates empty...");
    }
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
