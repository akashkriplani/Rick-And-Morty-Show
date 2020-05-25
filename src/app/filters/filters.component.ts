import { Component } from '@angular/core';
import { FilterInputService } from '../services/filter-input.service';
import { IKeyValue } from '../interfaces/characters.interface';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})

export class FiltersComponent {
  public filterArray: IKeyValue[];
  public allFilters: IKeyValue[] = [];

  public species: IKeyValue[] = [
    { key: 'species', value: 'Human' },
    { key: 'species', value: 'Mytholog' },
    { key: 'species', value: 'Other' }
  ];

  public genders: IKeyValue[] = [
    { key: 'gender', value: 'Male' },
    { key: 'gender', value: 'Female' }
  ];

  public origins: IKeyValue[] = [
    { key: 'Unknown', value: 'unknown' },
    { key: 'Post-Apocalyptic', value: 'apocalyptic' },
    { key: 'Nuptia 4', value: 'nuptia' },
    { key: 'Other Origins...', value: 'other' }
  ];

  constructor(private filterInputService: FilterInputService) {}

  public specieSelect(event: any, value: string): void {
    console.log(event.srcElement.checked);
    this.filterArray = this.applyAllFilters(this.species, value, event.srcElement.checked);
    this.setAllFilters();
  }

  public genderSelect(event: any, value: string): void {
    this.filterArray = this.applyAllFilters(this.genders, value, event.srcElement.checked);
    this.setAllFilters();
  }

  public originSelect(event: any, value: string): void {
    this.filterArray = this.applyAllFilters(this.origins, value, event.srcElement.checked);
    this.setAllFilters();
  }

  public applyAllFilters(array: IKeyValue[], value: string, isChecked: boolean): IKeyValue[] {
    return array.filter(item => {
      return item.value === value && isChecked;
    });
  }

  private setAllFilters(): void {
    this.allFilters.push(...this.filterArray);
    this.filterInputService.filterSubject.next(...this.filterArray);
  }
}
