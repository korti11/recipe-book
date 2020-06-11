import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'recipe-book-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  links = [
    { title: "Recipe Book", fragment: "home"},
    { title: "Recipes", fragment: "recipes" }
  ]

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
