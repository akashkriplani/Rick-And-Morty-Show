import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  constructor(private http: HttpClient) {}
  getCharacters(): Observable<{}> {
    return this.http.get('https://rickandmortyapi.com/api/character/');
  }
}
