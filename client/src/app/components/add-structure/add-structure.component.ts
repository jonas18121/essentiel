import { Component, OnInit } from '@angular/core';
import { Structure } from "../../models/structure/structure";
import { StructureService } from "../../services/structure/structure.service";
import { Router } from "@angular/router";
import { FormBuilder, ReactiveFormsModule} from "@angular/forms";
import { GeolocalisationService } from "../../services/geolocalisation/geolocalisation.service";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-add-structure',
  templateUrl: './add-structure.component.html',
  styleUrls: ['./add-structure.component.css']
})
export class AddStructureComponent implements OnInit {

  result: any;

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
    private http: HttpClient) {
  }

  ngOnInit(): void {}

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
