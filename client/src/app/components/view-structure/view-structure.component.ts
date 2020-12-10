import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Structure} from "../../models/structure/structure";
import {StructureService} from "../../services/structure/structure.service";

@Component({
  selector: 'app-view-structure',
  templateUrl: './view-structure.component.html',
  styleUrls: ['./view-structure.component.css']
})
export class ViewStructureComponent implements OnInit {

  currentStructure: Structure;

  constructor(private activatedRoute: ActivatedRoute,
              private structureService: StructureService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let structureId = Number(params.get('structureId'));
      this.structureService.findById(structureId).subscribe(data => {
        this.currentStructure = data;
      })
    });
  }

}
