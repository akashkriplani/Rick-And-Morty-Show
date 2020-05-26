import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FilterInputService } from '../../services/filter-input.service';
import { IKeyValue } from '../../interfaces/characters.interface';
import { Constants } from '../../constants/constants';
import { SortOrder } from '../../enumerations/sort-order.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public nameSearch = '';
  public sortOrder = SortOrder.Ascending;
  public filtersList = [];
  public constants = Constants.header;

  @Output() public filterKey: EventEmitter<IKeyValue[]> = new EventEmitter();
  @Output() public searchEvent: EventEmitter<string> = new EventEmitter();
  @Output() public sort: EventEmitter<string> = new EventEmitter();

  constructor(private filterService: FilterInputService) {}

  /**
   * @description Applies filters on component load
   * @memberof HeaderComponent
   */
  public ngOnInit(): void {
    this.filterService.filterSubject.subscribe(data => {
      this.applyFilters(data);
    });
  }

  /**
   * @description Emits sort order on dropdown selection change
   * @returns void
   * @memberof HeaderComponent
   */
  public valueChanged(): void {
    this.sort.emit(this.sortOrder);
    this.filterKey.emit(this.filtersList);
  }

  /**
   * @description Emits a search event and filter data on the basis of input entered
   * @memberof HeaderComponent
   */
  public searchByName(): void {
    this.searchEvent.emit(this.nameSearch);
    this.nameSearch = '';
  }

  /**
   * @description Applies filters and shows on the header component
   * @param  {IKeyValue} data
   * @returns void
   * @memberof HeaderComponent
   */
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
}
