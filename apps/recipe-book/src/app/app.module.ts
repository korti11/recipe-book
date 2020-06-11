import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NavComponent } from './nav/nav.component';
import { RecipeComponent } from './recipe/recipe.component';
import { Routing } from './app.routing';
import { RecipeListComponent } from './recipe/list/recipe-list.component';

@NgModule({
  declarations: [AppComponent, NavComponent, RecipeComponent, RecipeListComponent],
  imports: [
    BrowserModule,
    Routing,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
