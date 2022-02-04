import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  text = 'Nature';

  constructor() { }

  ngOnInit(): void {
  }

  onSearchChange(value: string): void {
    this.text = value;
  }
}
