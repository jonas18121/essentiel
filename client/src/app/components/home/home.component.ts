import { Component, OnInit } from '@angular/core';
import {PopUpService} from "../../services/pop-up/pop-up.service";
import {Router} from "@angular/router";
import {StructureService} from "../../services/structure/structure.service";
import {Structure} from "../../models/structure/structure";
import {EventService} from "../../services/event/event.service";
import {Event} from "../../models/event/event";
import {TokenStorageService} from "../../services/auth/token-storage.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  structures: Structure[];
  events: Event[];
  roles: string[];
  authority: string;

  constructor(private popupService: PopUpService,
              private router: Router,
              private structureService: StructureService,
              private eventService: EventService,
              private tokenStorage: TokenStorageService) { }

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
    this.findAllStructures();
    this.findAllEvents();
  }

  gotoAddStructure() {
    this.router.navigate(['/add/structure']);
  }

  editStructure(id) {
    this.router.navigate(['/add/structure'], { queryParams: { id: id } });
  }

  delStructure(id) {
    this.structureService.delete(id).subscribe( () => {
      location.reload();
    });
  }

  gotoAddEvent() {
    this.router.navigate(['/add/event']);
  }

  editEvent(id) {
    this.router.navigate(['/add/event'], { queryParams: { id: id } });
  }

  delEvent(id) {
    this.eventService.delete(id).subscribe( () => {
      location.reload();
    });
  }

  findAllStructures() {
    this.structureService.findAll().subscribe(data => {
      this.structures = data;
    });
  }

  findAllEvents() {
    this.eventService.findAll().subscribe(data => {
      this.events = data;
    });
  }

  toLowerCase(string: string) {
    return string.toLowerCase();
  }

  encodeUri(uri: string) {
    return encodeURI(uri);
  }
}
