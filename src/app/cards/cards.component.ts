import { Component, OnInit } from '@angular/core';
import { FiltersService } from '../services/filters.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  characters$: Observable<any>;
  characters: any[];
  yearDiff: number;
  year = new Date();
  result: [];
  searchNameCard: string;
  charactersList: any[];

  constructor(private filterService: FiltersService) {}

  public ngOnInit(): void {
    this.getCharacters();
  }

  private getCharacters(): void {
    this.characters$ = this.filterService.getCharacters();
    this.characters$.subscribe((data) => {
      this.characters = data.results;
      this.characters.sort((a, b) => a.id - b.id);
      this.charactersList = this.characters;
    });
  }

  /**
   * @description Sort the characters in ascending/descending order based on id
   * @param {string} sortOrder
   * @returns void
   */
  public sortCharacters(sortOrder: string): void {
    if (sortOrder === 'ascending') {
      this.characters.sort((a, b) => a.id - b.id);
    } else if (sortOrder === 'descending') {
      this.characters = this.characters.sort((a, b) => b.id - a.id);
    }
    this.charactersList = this.characters;
  }

  public search(name: string): void {
    this.searchNameCard = name.trim().toLowerCase();
    if (this.searchNameCard !== '') {
      this.charactersList = this.characters.filter((item) => {
        return item.name.toLowerCase().includes(this.searchNameCard);
      });
    } else {
      this.getCharacters();
    }
  }

  public filterSearch(obj: any): void {
    const keyInput = obj.key;
    this.charactersList = this.characters.filter((item) => {
      for (const property in item) {
        if (item.hasOwnProperty(property)) {
          if (item[property] === obj.value) {
            return true;
          }
        }
      }
    });
  }
}
