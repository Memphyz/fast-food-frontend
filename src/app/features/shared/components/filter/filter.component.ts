import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

const DEBOUNCE = 500;

@Component({
  selector: 'fast-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() public placeholder = 'Pesquisar'
  @Input() public icon = 'search'
  @Output() public readonly filterevent = new EventEmitter<string>();

  public readonly filterBehaviour = new Subject<string>();

  public ngOnInit(): void {
    this.filterBehaviour.pipe(debounceTime(DEBOUNCE)).subscribe((search) => this.filterevent.emit(search))
  }
}
