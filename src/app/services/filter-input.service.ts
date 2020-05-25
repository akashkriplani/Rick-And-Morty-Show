import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IKeyValue } from '../interfaces/characters.interface';

@Injectable({
  providedIn: 'root'
})
export class FilterInputService {
  public filterSubject = new Subject<IKeyValue>();
  constructor() {}
}
