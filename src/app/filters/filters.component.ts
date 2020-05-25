import { Component } from '@angular/core';
import { FilterInputService } from '../services/filter-input.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})

export class FiltersComponent {
  public filterArray: any[];
  public allFilters: any[] = [];

  public species: any[] = [
    { key: 'species', value: 'Human' },
    { key: 'species', value: 'Mytholog' },
    { key: 'species', value: 'Other' }
  ];

  public genders: any[] = [
    { key: 'gender', value: 'Male' },
    { key: 'gender', value: 'Female' }
  ];

  public origins: any[] = [
    { key: 'Unknown', value: 'unknown' },
    { key: 'Post-Apocalyptic', value: 'apocalyptic' },
    { key: 'Nuptia 4', value: 'nuptia' },
    { key: 'Other Origins...', value: 'other' }
  ];

  constructor(private filterInputService: FilterInputService) {}

  public specieSelect(value: string): void {
    this.filterArray = this.applyAllFilters(this.species, value);
    this.allFilters.push(...this.filterArray);
    this.filterInputService.filter.next(...this.filterArray);
  }

  public genderSelect(value: string): void {
    this.filterArray = this.applyAllFilters(this.genders, value);
    this.allFilters.push(...this.filterArray);
    this.filterInputService.filter.next(...this.filterArray);
  }

  public originSelect(value: string): void {
    this.filterArray = this.applyAllFilters(this.origins, value);
    this.allFilters.push(...this.filterArray);
    this.filterInputService.filter.next(...this.filterArray);
  }

  public applyAllFilters(array, value): any[] {
    return array.filter(item => {
      return item.value === value;
    });
  }
}
