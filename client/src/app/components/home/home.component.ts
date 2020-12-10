import { Component, OnInit } from '@angular/core';
import {PopUpService} from "../../services/pop-up/pop-up.service";
import {Router} from "@angular/router";
import {StructureService} from "../../services/structure/structure.service";
import {Structure} from "../../models/structure/structure";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  structures: Structure[];

  constructor(private popupService: PopUpService,
              private router: Router,
              private structureService: StructureService) { }

  ngOnInit(): void {
    this.findAllStructure();
  }

  gotoAddStructure() {
    this.router.navigate(['/add/structure']);
  }

  findAllStructure() {
    this.structureService.findAll().subscribe(data => { this.structures = data });
  }

  toLowerCase(string: string) {
    return string.toLowerCase();
  }
}
