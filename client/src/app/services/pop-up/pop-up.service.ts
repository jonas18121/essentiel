import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor() { }

  // "data" is defined in marker-service as "s"
  makeStructuresPopup(data: any): string {
    let res = ``;
    data.name ? res += `<div>Nom : ${ data.name }</div>` : null
    data.type ? res += `<br>` + `<div>Type : ${ data.type }</div>` : null
    data.address ? res += `<div>Adresse : ${ data.address }</div>` : null
    data.description ? res += `<br>` + `<div>Description : ${ data.description }</div>` : null
    data.contactName ? res += `<br>` +`<div>Contact</div>` : null
    data.contactFunction ? res += `<div>Fonction : ${ data.contactFunction }</div>` : null
    data.phone ? res += `<div>Tel : ${ data.phone }</div>` : null
    data.email ? res += `<div>Email : ${ data.email }</div>` : null
    data.label ? res += `<br>` + `<div>Label / Agréement : ${ data.label }</div>` : null
    console.log(res);
    return res;
  }
}
