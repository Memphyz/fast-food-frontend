import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';


@Directive({
  selector: '[fastCollapse]',
  host: {
    'class': 'fast-collapse'
  }
})
export class CollapseDirective {

  @Input() public startOpen = true;
  @Input() @HostBinding('attr.title') public title = 'Collapse';

  @HostBinding('class.fast-collapse-open') private open: boolean;

  constructor(private readonly el: ElementRef<HTMLElement>) {
    this.open = this.startOpen;
  }

  @HostListener('click', ['$event.target'])
  public click(target: EventTarget) {
    target === this.el.nativeElement && (this.open = !this.open)
  }

}
