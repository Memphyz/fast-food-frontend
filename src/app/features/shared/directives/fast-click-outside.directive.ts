import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output
} from '@angular/core';

@Directive({
  selector: '[fastFastClickOutside]'
})
export class FastClickOutsideDirective {

  @Output() public readonly outside = new EventEmitter();
  @Input() public ignore: HTMLElement;

  constructor(private readonly el: ElementRef<HTMLElement>) {}

  @HostListener('document:click', ['$event.target'])
  public click(target: HTMLElement): void {
    const shoudEmit = this.ignore ? !target.contains(this.el.nativeElement) || !this.ignore.contains(target) || !target.contains(this.ignore) : target.contains(this.el.nativeElement);
    console.log();

    shoudEmit && this.outside.emit();
  }

}
