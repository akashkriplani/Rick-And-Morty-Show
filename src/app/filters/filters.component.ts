import { Component } from '@angular/core';
import { FilterInputService } from '../services/filter-input.service';
import { IKeyValue } from '../interfaces/characters.interface';
import { Constants } from '../constants/constants';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})

export class FiltersComponent {

  public filterArray: IKeyValue[];
  public allFilters: IKeyValue[] = [];
  public constants = Constants.filters;

  public species: IKeyValue[] = [
    { key: 'species', value: 'Human', checked: false },
    { key: 'species', value: 'Mytholog', checked: false },
    { key: 'species', value: 'Other', checked: false }
  ];

  public genders: IKeyValue[] = [
    { key: 'gender', value: 'Male', checked: false },
    { key: 'gender', value: 'Female', checked: false }
  ];

  public origins: IKeyValue[] = [
    { key: 'Unknown', value: 'unknown', checked: false },
    { key: 'Post-Apocalyptic', value: 'apocalyptic', checked: false },
    { key: 'Nuptia 4', value: 'nuptia', checked: false },
    { key: 'Other Origins...', value: 'other', checked: false }
  ];

  constructor(private filterInputService: FilterInputService) {}

  /**
   * @description Applies species based filters
   * @param  {any} event
   * @param  {string} value
   * @returns void
   * @member FiltersComponent
   */
  public specieSelect(event: any, value: string): void {
    this.filterArray = this.applyAllFilters(this.species, value, event.srcElement.checked);
    this.setAllFilters();
  }

  /**
   * @description Applies gender based filters
   * @param  {any} event
   * @param  {string} value
   * @returns void
   * @member FiltersComponent
   */
  public genderSelect(event: any, value: string): void {
    this.filterArray = this.applyAllFilters(this.genders, value, event.srcElement.checked);
    this.setAllFilters();
  }

  /**
   * @description Applies species based filters
   * @param  {any} event
   * @param  {string} value
   * @returns void
   * @member FiltersComponent
   */
  public originSelect(event: any, value: string): void {
    this.filterArray = this.applyAllFilters(this.origins, value, event.srcElement.checked);
    this.setAllFilters();
  }

  /**
   * @description filters data and returns the value on specific filters
   * @param  {IKeyValue[]} array
   * @param  {string} value
   * @param  {boolean} isChecked
   * @returns IKeyValue
   * @member FiltersComponent
   */
  public applyAllFilters(array: IKeyValue[], value: string, isChecked: boolean): IKeyValue[] {
    return array.filter(item => {
      return item.value === value;
    });
  }

  /**
   * @description Sets all filters and pushes to filter service
   * @private
   * @memberof FiltersComponent
   */
  private setAllFilters(): void {
    this.allFilters.push(...this.filterArray);
    this.filterInputService.filterSubject.next(...this.filterArray);
  }
}
