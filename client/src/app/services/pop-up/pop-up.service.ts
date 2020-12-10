import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor() { }

  // "data" is defined in marker-service as "s"
  makeStructuresPopup(data: any): string {
    return `` +
      `<div>ID: ${ data.id }</div>` +
      `<div>Name: ${ data.name }</div>` +
      `<div>Address: ${ data.address }</div>` +
      `<div>Coordinates: [ ${ data.longitude }, ${ data.latitude } ]</div>`;

  }
}
