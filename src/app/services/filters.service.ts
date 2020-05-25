import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRickMortyApiResponse } from '../interfaces/characters.interface';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  constructor(private http: HttpClient) {}

  public getCharacters(): Observable<IRickMortyApiResponse> {
    return this.http.get<IRickMortyApiResponse>('https://rickandmortyapi.com/api/character/');
  }
}
