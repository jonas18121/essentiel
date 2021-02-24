import { Component, OnInit } from '@angular/core';
import { Structure } from "../../models/structure/structure";
import { StructureService } from "../../services/structure/structure.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder} from "@angular/forms";
import { GeolocalisationService } from "../../services/geolocalisation/geolocalisation.service";
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

  structureToAdd: Structure;
  lastkeydown1: number = 0;
  addressList: [];

  sub: any;
  structureToEditId: number;

  structureForm = this.fb.group({
    name: [''],
    type: [''],
    street: [''],
    city: [''],
    zip: [''],
    address: [''],
    description: [''],
    contactName: [''],
    contactFunction: [''],
    phone: [''],
    email: [''],
    label: [''],
    lon: [''],
    lat: ['']
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private structureService: StructureService,
    private geolocalisationService: GeolocalisationService,
    private fb: FormBuilder,
    private http: HttpClient,
    private tokenStorage: TokenStorageService) {
    this.structureToAdd = new Structure();
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
      this.structureToEditId = params['id'] || 0;
    });
    if (this.structureToEditId != 0) {
      this.structureService.findById(this.structureToEditId).subscribe(data => {
        this.structureForm.controls['name'].setValue(data.name);
        this.structureForm.controls['type'].setValue(data.type);
        this.structureForm.controls['address'].setValue(data.address);
        this.geolocalisationService.search(data.address).subscribe(response => {
          this.addressList = response["features"];
          this.structureForm.controls['street'].setValue(response["features"][0]["properties"]["name"]);
          this.structureForm.controls['city'].setValue(response["features"][0]["properties"]["city"]);
          this.structureForm.controls['zip'].setValue(response["features"][0]["properties"]["postcode"]);
          this.structureForm.controls['lon'].setValue(response["features"][0]["geometry"]["coordinates"][0]);
          this.structureForm.controls['lat'].setValue(response["features"][0]["geometry"]["coordinates"][1]);
        });
        this.structureForm.controls['description'].setValue(data.description);
        this.structureForm.controls['contactName'].setValue(data.contactName);
        this.structureForm.controls['contactFunction'].setValue(data.contactFunction);
        this.structureForm.controls['phone'].setValue(data.phone);
        this.structureForm.controls['email'].setValue(data.email);
        this.structureForm.controls['label'].setValue(data.label);
      }) ;
    }
  }

  onSubmit(): void {
    let currentAddress = new Address();
    this.structureToAdd.name = this.structureForm.value.name;
    this.structureToAdd.type = this.structureForm.value.type;
    currentAddress.city = this.structureForm.value.city;
    currentAddress.street = this.structureForm.value.street;
    currentAddress.postalcode = this.structureForm.value.zip;
    currentAddress.country = "France";
    this.structureToAdd.address = currentAddress.street + " " + currentAddress.postalcode + " " + currentAddress.city;
    this.structureToAdd.description = this.structureForm.value.description;
    this.structureToAdd.contactName = this.structureForm.value.contactName;
    this.structureToAdd.contactFunction = this.structureForm.value.contactFunction;
    this.structureToAdd.phone = this.structureForm.value.phone;
    this.structureToAdd.email = this.structureForm.value.email;
    this.structureToAdd.label = this.structureForm.value.label;
    this.structureToAdd.longitude = this.structureForm.value.lon;
    this.structureToAdd.latitude = this.structureForm.value.lat;
    if (this.structureToAdd.name && this.structureToAdd.address && this.structureToAdd.longitude && this.structureToAdd.latitude) {
      if (this.structureToEditId != 0) {
        this.structureService.update(this.structureToEditId, this.structureToAdd).subscribe(() => this.gotoHome());
      }else{
        this.structureService.save(this.structureToAdd).subscribe(() => this.gotoHome());
      }
    }else {
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
        this.structureForm.controls['street'].setValue(response["features"][0]["properties"]["name"]);
        this.structureForm.controls['city'].setValue(response["features"][0]["properties"]["city"]);
        this.structureForm.controls['zip'].setValue(response["features"][0]["properties"]["postcode"]);
        this.structureForm.controls['lon'].setValue(response["features"][0]["geometry"]["coordinates"][0]);
        this.structureForm.controls['lat'].setValue(response["features"][0]["geometry"]["coordinates"][1]);
        this.lastkeydown1 = $event.timeStamp;
      });
    }
  }
}
