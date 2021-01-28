import { Component, OnInit } from '@angular/core';
import { Structure } from "../../models/structure/structure";
import { StructureService } from "../../services/structure/structure.service";
import { Router } from "@angular/router";
import { FormBuilder, ReactiveFormsModule} from "@angular/forms";
import { GeolocalisationService } from "../../services/geolocalisation/geolocalisation.service";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import {TokenStorageService} from "../../services/auth/token-storage.service";

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
    structureToAdd.name = this.structureForm.value.name;
    structureToAdd.address = this.structureForm.value.address;
    this.searchLocation(this.structureForm.value.address).subscribe(response => {
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

  private searchLocation(location: string): Observable<object> {
    return this.http.get(
      `https://nominatim.openstreetmap.org/?format=jsonv2&zoom=12&addressdetails=1&q=${location}&limit=1`,
      {
        responseType: 'json'
      });
  }
}
