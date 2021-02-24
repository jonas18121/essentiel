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
    data.contactName ? res += `<br>` +`<div>Contact : ${ data.contactName }</div>` : null
    data.contactFunction ? res += `<div>Fonction : ${ data.contactFunction }</div>` : null
    data.phone ? res += `<div>Tel : ${ data.phone }</div>` : null
    data.label ? res += `<br>` + `<div>Label / Agréement : ${ data.label }</div>` : null

    data.street && data.city && data.zip ? res += `<div>Adresse : ${ data.street }, ${ data.zip } ${ data.city }</div>` : null
    data.organizer ? res += `<br>` + `<div>Organisé par : ${ data.organizer.name }</div>` : null
    if (data.date)
      data.date && data.hour ? res += `<br>` + `<div>Date : le ${ this.splitDate(data.date) } à ${ data.hour }</div>` : res += `<br>` + `<div>Date : ${ data.date }</div>`
    data.audience ? res += `<br>` + `<div>Public cible : ${ data.audience }</div>` : null
    data.price ? res += `<br>` + `<div>Tarif : ${ data.price }</div>` : null

    data.address ? res += `<br>` + `<a href="/wiki/structures/${ encodeURI(data.name).toLowerCase() }" target="_blank">Accéder à la page wiki</a>` : res += `<br>` + `<a href="/wiki/évènements/${ encodeURI(data.name).toLowerCase() }" target="_blank">Accéder à la page wiki</a>`

    return res;
  }

  private splitDate(str) {
    const dateArray = str.split('-');
    return dateArray[1] + "/" + dateArray[2] + "/" + dateArray[0];
  }
}
