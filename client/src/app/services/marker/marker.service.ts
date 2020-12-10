import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { PopUpService } from '../pop-up/pop-up.service';
import {StructureService} from "../structure/structure.service";

@Injectable({
  providedIn: 'root'
})

export class MarkerService {

  private coordinates: any[];

  constructor(private popupService: PopUpService,
              private structureService: StructureService) { }

  makeStructuresMarkers(map: L.map): void {
    this.structureService.findAll().subscribe((res: any) => {

      for (const s of res) {

        this.coordinates = [s.latitude, s.longitude];

        const marker = L.marker(this.coordinates);

        marker.bindPopup(this.popupService.makeStructuresPopup(s));

        marker.addTo(map);
      }

    });
  }
}
