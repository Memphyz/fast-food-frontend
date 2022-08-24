import { IAddress } from './../../../core/interfaces/address.interface';
import { AddressService } from './../../../core/services/address/address.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'fast-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  public addresses: IAddress[] = []

  constructor(private readonly addressService: AddressService, private readonly sanitizer: DomSanitizer) {}

  public ngOnInit(): void {
    this.fetch();
  }

  public ifurl(address: IAddress): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.google.com/maps/embed/v1/place?key=AIzaSyBJ0DBgKEpHbmhsC3jLNjBTedXaDCRbCTs&q=${address.address},${address.number}, ${address.postalCode}` as any);
  }

  private fetch(): void {
    this.addressService.findAll().subscribe((address) => this.addresses = address);
  }

}
