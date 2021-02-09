import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";
import { Event } from "../../models/event/event";
import {TokenStorageService} from "../auth/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private readonly eventUrl: string;
  private tokenType  = 'Bearer ';

  constructor(private http: HttpClient, private tokenService: TokenStorageService) {
    this.eventUrl = 'http://localhost:8080/api/event/';
  }

  public findAll(): Observable<Event[]> {
    const header = new HttpHeaders().set('Authorization', this.tokenType + this.tokenService.getToken());
    const headers = { headers: header };
    return this.http.get<Event[]>(this.eventUrl, headers);
  }

  public findById(EventId: number): Observable<Event> {
    const header = new HttpHeaders().set('Authorization', this.tokenType + this.tokenService.getToken());
    const headers = { headers: header };
    return this.http.get<Event>(this.eventUrl + EventId, headers);
  }

  public save(Event: Event): Observable<Event> {
    const header = new HttpHeaders().set('Authorization', this.tokenType + this.tokenService.getToken());
    const headers = { headers: header };
    console.log(headers);
    return this.http.post<Event>(this.eventUrl, Event, headers);
  }

  public delete(Event: Event): Observable<Event> {
    const header = new HttpHeaders().set('Authorization', this.tokenType + this.tokenService.getToken());
    const headers = { headers: header };
    return this.http.delete<Event>(this.eventUrl + Event.id, headers);
  }
}
