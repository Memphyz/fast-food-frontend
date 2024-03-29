import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'fast-icon',
  template: '',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {

  @Input() public icon: string;

  public get url(): string {
    return `url(./../../../../../assets/images/icons/${this.icon}.svg)`
  }

  @HostBinding('style.width.px')
  @HostBinding('style.height.px')
  @Input() public size = 25;
  @Input() public color: string = 'gray';


  @HostBinding('style.background-color')
  public get ascentColor(): string {
    return this.color === 'default' ? 'transparent' : this.color;
  }

  @HostBinding('style.display')
  public get display(): string {
    return !this.icon ? 'none' : 'block';
  }

  @HostBinding('style.mask-image')
  @HostBinding('style.-webkit-mask-image')
  public get path(): string {
    return this.color !== 'default' && this.url;
  }

  @HostBinding('style.background-image')
  public get pathDefault(): string {
    return this.color === 'default' && this.url;
  }
}
