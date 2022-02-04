import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Output() change: EventEmitter<any> = new EventEmitter();
  
  @ViewChild('search') searchElement: ElementRef | undefined;
  
  value = 'Nature';
  showSearch = false;

  changed: Subject<string> = new Subject<string>();
  changeSubscription: Subscription | undefined;

  constructor() { }

  ngOnInit(): void {
    this.changeSubscription = this.changed
    .pipe(
      debounceTime(1000),
      distinctUntilChanged()
    )
    .subscribe(text => {
      this.change.emit(text);
    });
  }

  toggle() {
    this.showSearch = !this.showSearch;
    if (this.showSearch) {
      // wait for render so the element is in the dom
      setTimeout(() => {
        this.searchElement?.nativeElement.select();
      },0);
    }
  }

  ngOnDestroy() {
    this.changeSubscription?.unsubscribe();
  }
}
