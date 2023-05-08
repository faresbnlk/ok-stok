import { IUser } from './user.interface';
export class Review {
  id!: number;
  reviewText!: string;
  reviewer!: IUser;
  mark!: number;
}
