import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'recipe-book-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  listHeight = NaN
  recipeTitles = []

  constructor() { 
    for(let i = 0; i < 300; i++) {
      this.recipeTitles.push(`Recipe #${i}`);
    }
  }

  private calcPageSize() {
    const windowHeight = window.innerHeight;
    return (windowHeight - 56);   // (Window height - Navbar height - Pagination Height) / List element height
  }

  ngOnInit(): void {
    this.listHeight = this.calcPageSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.listHeight = this.calcPageSize();
  }

}
