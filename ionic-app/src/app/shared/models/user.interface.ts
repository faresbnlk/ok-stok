import { AddressModel } from './address.model';
import { Review } from './review.model';
export interface IUser {
  id: number;
  dateCreated: string;
  firstName: string;
  lastName: string;
  address: AddressModel;
  verifiedUser: boolean;
  email: string;
  imageUrl: string;
  name: string;
  phone: string;
  pirimaryContact: string;
  providerId: string;
  roles:any;
  description: string;
  reviews: Review [];
}
