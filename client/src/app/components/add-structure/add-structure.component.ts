import { Component, OnInit } from '@angular/core';
import { Structure } from "../../models/structure/structure";
import { StructureService } from "../../services/structure/structure.service";
import { Router } from "@angular/router";
import { FormBuilder, ReactiveFormsModule} from "@angular/forms";
import { GeolocalisationService } from "../../services/geolocalisation/geolocalisation.service";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import {TokenStorageService} from "../../services/auth/token-storage.service";
import {Address} from "../../models/address/address";

@Component({
  selector: 'app-add-structure',
  templateUrl: './add-structure.component.html',
  styleUrls: ['./add-structure.component.css']
})
export class AddStructureComponent implements OnInit {

  result: any;
  roles: string[];
  authority: string;

  structureForm = this.fb.group({
    name: [''],
    type: [''],
    street: [''],
    city: [''],
    zip: [''],
    description: [''],
    contactName: [''],
    contactFunction: [''],
    phone: [''],
    email: [''],
    label: ['']
  });

  constructor(
    private router: Router,
    private structureService: StructureService,
    private geolocalisationService: GeolocalisationService,
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
    let structureToAdd = new Structure();
    let currentAddress = new Address();
    structureToAdd.name = this.structureForm.value.name;
    currentAddress.city = this.structureForm.value.city;
    currentAddress.street = this.structureForm.value.street;
    currentAddress.postalcode = this.structureForm.value.zip;
    currentAddress.country = "France";
    this.searchLocation(currentAddress).subscribe(response => {
      if (response[0]) {
        structureToAdd.address = response[0].display_name;
        structureToAdd.longitude = response[0].lon;
        structureToAdd.latitude = response[0].lat;
        if (structureToAdd.address && structureToAdd.longitude && structureToAdd.latitude)
          this.structureService.save(structureToAdd).subscribe(() => this.gotoHome());
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
