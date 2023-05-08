import { IUser } from './user.interface';
import { AddressModel } from './address.model';
import { ProductItemModel } from 'src/app/pages/product/product-list/product-list.model';
export class CommandModel {
  id!: string;
  products!: ProductItemModel[];
  date!: string;
  customer!: IUser;
  address!: AddressModel;
  commanStatus!: string;
  details!: string;
}
