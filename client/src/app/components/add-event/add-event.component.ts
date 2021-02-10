import { Component, OnInit } from '@angular/core';
import { Event } from "../../models/event/event";
import { Router } from "@angular/router";
import { FormBuilder, ReactiveFormsModule} from "@angular/forms";
import { EventService } from "../../services/event/event.service";
import {TokenStorageService} from "../../services/auth/token-storage.service";
import {Address} from "../../models/address/address";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  result: any;
  roles: string[];
  authority: string;

  eventForm = this.fb.group({
    name: [''],
    date: [''],
    hour: [''],
    street: [''],
    city: [''],
    zip: [''],
    structure: [''],
    public: [''],
    price: ['']
  });

  constructor(
    private router: Router,
    private eventService: EventService,
    private fb: FormBuilder,
    private http: HttpClient,
    private tokenStorage: TokenStorageService) {
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
    let eventToAdd = new Event();
    let currentAddress = new Address();
    eventToAdd.name = this.eventForm.value.name;
    currentAddress.city = this.eventForm.value.city;
    currentAddress.street = this.eventForm.value.street;
    currentAddress.postalcode = this.eventForm.value.zip;
    currentAddress.country = "France";
    this.searchLocation(currentAddress).subscribe(response => {
      if (response[0]) {
        eventToAdd.longitude = response[0].lon;
        eventToAdd.latitude = response[0].lat;
        if (eventToAdd.longitude && eventToAdd.latitude)
          this.eventService.save(eventToAdd).subscribe(() => this.gotoHome());
        else
          console.log("ERROR !!!");
      }
    });
  }

  gotoHome(): void {
    this.router.navigate(['/home']);
  }

  private searchLocation(location: Address): Observable<object> {
    return this.http.get(
      `https://nominatim.openstreetmap.org/?format=jsonv2&zoom=12&addressdetails=1&street=${location.street}&city=${location.city}&country=${location.country}&postalcode=${location.postalcode}&limit=1`,
      {
        responseType: 'json'
      });
  }
}
