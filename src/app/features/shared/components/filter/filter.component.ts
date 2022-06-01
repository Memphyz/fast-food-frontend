import { Component, Input } from '@angular/core';

@Component({
  selector: 'fast-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  @Input() public placeholder = 'Pesquisar'
  @Input() public icon = 'search'
}
