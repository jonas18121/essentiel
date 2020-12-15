import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Event } from "../../models/event/event";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private readonly eventUrl: string;

  constructor(private http: HttpClient) {
    this.eventUrl = 'http://localhost:8080/api/event/';
  }

  public findAll(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventUrl);
  }

  public findById(EventId: number): Observable<Event> {
    return this.http.get<Event>(this.eventUrl + EventId);
  }

  public save(Event: Event): Observable<Event> {
    return this.http.post<Event>(this.eventUrl, Event);
  }

  public delete(Event: Event): Observable<Event> {
    return this.http.delete<Event>(this.eventUrl + Event.id);
  }
}
