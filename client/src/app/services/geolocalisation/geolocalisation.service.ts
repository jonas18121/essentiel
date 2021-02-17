import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Address} from "../../models/address/address";

@Injectable({
  providedIn: 'root'
})
export class GeolocalisationService {

  private readonly seriesUrl: string;

  constructor(private http: HttpClient) {
    this.seriesUrl = 'https://api-adresse.data.gouv.fr/search/';
  }

  search(location: string): Observable<object> {
    return this.http.get<object>(`${this.seriesUrl}?q=${location}&type=housenumber&autocomplete=1`,
      {
        responseType: 'json'
      });

  }


}
