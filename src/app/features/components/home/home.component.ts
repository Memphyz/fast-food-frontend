import { Payments } from './../../../core/enums/payment.enum';
import { UserService } from './../../../core/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import faker from '@faker-js/faker';
import { map } from 'rxjs';
import { Restaurant } from 'src/app/core/interfaces/restaurant.interface';

@Component({
  selector: 'fast-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private readonly userService: UserService) {}

  public async ngOnInit(): Promise<void> {
    this.userService.findAll().pipe(map((user) => user.map(us => us['id']))).subscribe({
      next: (users) => {
        users.forEach((user) => {
          const restaurant: Partial<Restaurant> = {
            name: `${faker.name.middleName()} ${faker.company.companySuffix()}`,
            freight: +faker.random.numeric(2, { allowLeadingZeros: true }),
            active: faker.random.boolean(),
            address: {
              street: faker.address.streetName(),
              number: +faker.random.numeric(3, { allowLeadingZeros: true }),
              city: faker.address.city(),
              state: faker.address.state(),
              district: faker.name.middleName(),
              neighborhood: faker.address.cityPrefix(),
              postalCode: faker.address.zipCode('########'),
            },
            open: '0900',
            close: '2200',
            kitchen: faker.name.jobTitle(),
            payments: [Payments.CASH, Payments.DEBIT_CARD, Payments.CREDIT_CARD],
            owners: [user],
            products: [],
          }
          console.log(restaurant);

        })
      }
    })


  }

}
