import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor() { }

  // "data" is defined in marker-service as "s"
  makeStructuresPopup(data: any): string {
    return `` +
      //`<div>ID : ${ data.id }</div>` +
      //`<br>` +
      `<div>Nom : ${ data.name }</div>` +
      `<div>Type : ${ data.type }</div>` +
      `<div>Adresse : ${ data.street } ${ data.city } ${ data.zip }</div>` +
      `<br>` +
      `<div>Description : ${ data.description }</div>` +
      `<br>` +
      `<div>Contact</div>` +
      `<div>Nom : ${ data.contactName }</div>` +
      `<div>Fonction : ${ data.contactFunction }</div>` +
      `<div>Tel : ${ data.phone }</div>` +
      `<div>Email : ${ data.email }</div>` +
      `<br>` +
      `<div>Label / Agréement : ${ data.label }</div>` +
      `<br>` +
      `<div>Coordonées : [ ${ data.longitude }, ${ data.latitude } ]</div>`;
  }
}
