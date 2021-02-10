import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Structure} from "../../models/structure/structure";
import {TokenStorageService} from "../auth/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class StructureService {
  private readonly structureUrl: string;
  private tokenType  = 'Bearer ';

  constructor(private http: HttpClient, private tokenService: TokenStorageService) {
    this.structureUrl = 'http://server:8080/api/structure/';
  }

  public findAll(): Observable<Structure[]> {
    const header = new HttpHeaders().set('Authorization', this.tokenType + this.tokenService.getToken());
    const headers = { headers: header };
    return this.http.get<Structure[]>(this.structureUrl, headers);
  }

  public findById(structureId: number): Observable<Structure> {
    const header = new HttpHeaders().set('Authorization', this.tokenType + this.tokenService.getToken());
    const headers = { headers: header };
    return this.http.get<Structure>(this.structureUrl + structureId, headers);
  }

  public save(structure: Structure): Observable<Structure> {
    const header = new HttpHeaders().set('Authorization', this.tokenType + this.tokenService.getToken());
    const headers = { headers: header };
    return this.http.post<Structure>(this.structureUrl, structure, headers);
  }

  public delete(structure: Structure): Observable<Structure> {
    const header = new HttpHeaders().set('Authorization', this.tokenType + this.tokenService.getToken());
    const headers = { headers: header };
    return this.http.delete<Structure>(this.structureUrl + structure.id, headers);
  }
}
