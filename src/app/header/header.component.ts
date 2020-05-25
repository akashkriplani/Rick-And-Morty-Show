import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FilterInputService } from '../services/filter-input.service';
import { IKeyValue } from '../interfaces/characters.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public nameSearch = '';
  public sortOrder = 'ascending';
  public filtersList = [];
  @Output() public filterKey: EventEmitter<IKeyValue[]> = new EventEmitter();
  @Output() public searchEvent: EventEmitter<string> = new EventEmitter();
  @Output() public sort: EventEmitter<string> = new EventEmitter();

  constructor(private filterService: FilterInputService) {}

  public ngOnInit(): void {
    this.filterService.filterSubject.subscribe(data => {
      this.applyFilters(data);
    });
  }

  public valueChanged(): void {
    this.sort.emit(this.sortOrder);
  }

  public searchByName(): void {
    this.searchEvent.emit(this.nameSearch);
    this.nameSearch = '';
  }

  public applyFilters(data: IKeyValue): void {
    if (data) {
      const index = this.filtersList.indexOf(data.value);
      if (index === -1) {
        this.filtersList.push(data.value);
      } else {
        this.filtersList.splice(index, 1);
      }
    } else {
      this.filtersList = [];
    }
    this.filterKey.emit(this.filtersList);
  }

  public removeFilter(): void {
    // TODO: To be implemented
  }
}
