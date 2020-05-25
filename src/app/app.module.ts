import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FiltersComponent } from './filters/filters.component';
import { CardsComponent } from './cards/cards.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FiltersComponent,
    CardsComponent
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, NgbModule],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
