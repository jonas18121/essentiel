import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor() { }

  // "data" is defined in marker-service as "s"
  makeStructuresPopup(data: any): string {
    return `` +
      `<div>ID: ${ data.idStructure }</div>` +
      `<div>Name: ${ data.nameStructure }</div>` +
      `<div>Coordinates: ${ data.coordinates }</div>`;
  }
}
