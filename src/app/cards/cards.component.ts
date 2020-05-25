import { Component, OnInit } from '@angular/core';
import { FiltersService } from '../services/filters.service';
import { Observable } from 'rxjs';
import { IRickMortyApiResponse, ICharacter } from '../interfaces/characters.interface';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {

  public characters$: Observable<IRickMortyApiResponse>;
  public characters: ICharacter[];
  public searchNameCard: string;
  public charactersList: ICharacter[];
  public isError: boolean;
  public year = new Date();

  constructor(private filterService: FiltersService) {}

  /**
   * @description Runs on component initialization
   * @public
   * @memberof CardsComponent
   */
  public ngOnInit(): void {
    this.getCharacters();
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

  /**
   * @description Filters the list of characters based on the keywords entered by the user
   * @public
   * @param {string} name
   * @memberof CardsComponent
   */
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

  /**
   * @description Filters the characters based on the filter options selected on the left menu
   * @public
   * @param {string[]} filters
   * @returns void
   */
  public filterSearch(filters: string[]): void {
    if (filters && filters.length === 0) {
      this.charactersList = this.characters;
    } else {
      this.charactersList = this.characters.filter((item) => {
        for (const key in item) {
          if (item.hasOwnProperty(key)) {
            if (this.fetchFilteredSearchResults(item[key], filters)) {
              return true;
            }
          }
        }
      });
    }
  }

  /**
   * @description Fetches list of characters from character api and sorts it in ascending order
   * @private
   * @memberof CardsComponent
   */
  private getCharacters(): void {
    this.characters$ = this.filterService.getCharacters();
    this.isError = false;
    this.characters$.subscribe((data) => {
      this.characters = data.results;
      this.characters.sort((a, b) => a.id - b.id);
      this.charactersList = this.characters;
    }, error => {
      this.isError = true;
      console.log('Error fetching data');
    });
  }

  /**
   * @description Filters the data based on filter options selected and returns that object
   * @private
   * @param  {} item
   * @param  {string[]} filters
   * @returns boolean
   */
  private fetchFilteredSearchResults(item, filters: string[]): boolean {
    for (const f of filters) {
      if (item === f) {
        return true;
      }
    }
  }
}
