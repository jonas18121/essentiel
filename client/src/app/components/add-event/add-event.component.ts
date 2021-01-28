import { Component, OnInit } from '@angular/core';
import { Event } from "../../models/event/event";
import { Router } from "@angular/router";
import { FormBuilder, ReactiveFormsModule} from "@angular/forms";
import { EventService } from "../../services/event/event.service";
import {TokenStorageService} from "../../services/auth/token-storage.service";

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
    eventToAdd.name = this.eventForm.value.name;
    eventToAdd.address = this.eventForm.value.address;
    this.eventService.save(eventToAdd).subscribe(() => this.gotoHome());
  }

  gotoHome(): void {
    this.router.navigate(['/home']);
  }
}
