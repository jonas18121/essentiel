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
    this.seriesUrl = 'https://nominatim.openstreetmap.org/';
  }

  search(location: Address): Observable<object> {
    return this.http.get<object>(`${this.seriesUrl}?addressdetails=1&q=${location}&format=json&limit=1`,
      {
        responseType: 'json'
      });

  }


}
