import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { PopUpService } from './pop-up.service';

@Injectable({
  providedIn: 'root'
})

export class MarkerService {

  structures = '/assets/data/structures.json';

  constructor(private http: HttpClient,
              private popupService: PopUpService) {

  }

  makeStructuresMarkers(map: L.map): void {
    this.http.get(this.structures).subscribe((res: any) => {

      console.log(res.structures);

      for (const s of res) {
        const marker = L.marker(s.coordinates);

        marker.bindPopup(this.popupService.makeStructuresPopup(s));

        marker.addTo(map);
      }

    });
  }
}
