import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Structure} from "../../models/structure/structure";

@Injectable({
  providedIn: 'root'
})
export class StructureService {
  private readonly structureUrl: string;

  constructor(private http: HttpClient) {
    this.structureUrl = 'http://localhost:8080/api/structure/';
  }

  public findAll(): Observable<Structure[]> {
    return this.http.get<Structure[]>(this.structureUrl);
  }

  public findById(structureId: number): Observable<Structure> {
    return this.http.get<Structure>(this.structureUrl + structureId);
  }

  public save(structure: Structure): Observable<Structure> {
    return this.http.post<Structure>(this.structureUrl, structure);
  }

  public delete(structure: Structure): Observable<Structure> {
    return this.http.delete<Structure>(this.structureUrl + structure.id);
  }
}
