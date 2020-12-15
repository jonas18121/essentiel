import { Component, OnInit } from '@angular/core';
import {PopUpService} from "../../services/pop-up/pop-up.service";
import {Router} from "@angular/router";
import {StructureService} from "../../services/structure/structure.service";
import {Structure} from "../../models/structure/structure";
import {EventService} from "../../services/event/event.service";
import {Event} from "../../models/event/event";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  structures: Structure[];
  events: Event[];

  constructor(private popupService: PopUpService,
              private router: Router,
              private structureService: StructureService,
              private eventService: EventService) { }

  ngOnInit(): void {
    this.findAllStructures();
    this.findAllEvents();
  }

  gotoAddStructure() {
    this.router.navigate(['/add/structure']);
  }

  gotoAddEvent() {
    this.router.navigate(['/add/event']);
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
