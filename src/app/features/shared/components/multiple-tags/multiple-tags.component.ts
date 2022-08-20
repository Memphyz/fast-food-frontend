import { MultipleTag } from './../../../../core/models/multiple-tag.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'fast-multiple-tags',
  templateUrl: './multiple-tags.component.html',
  styleUrls: ['./multiple-tags.component.scss']
})
export class MultipleTagsComponent {

  @Input() public tags: MultipleTag<unknown>[] = [];
  public title = 'Adicionar';
  public updateTitle = 'Atualizar';

  @Output() public readonly add = new EventEmitter<void>();
  @Output() public readonly remove = new EventEmitter<number>();
  @Output() public readonly edit = new EventEmitter<MultipleTag<any>>();
  @Output() public readonly update = new EventEmitter<number>();

  public get someTagEditing(): boolean {
    return this.tags.some((tag) => tag.editing);
  }

  public get currentEditingTag(): MultipleTag<unknown> {
    return this.tags.find((tag) => tag.editing);
  }

  public get indexEditingTag(): number {
    return this.tags.indexOf(this.currentEditingTag);
  }

  public uneditAllTags(): void {
    this.tags.filter((tag) => tag.editing)?.length > 1 && this.tags.forEach((tag) => tag.editing = false);
  }

}
