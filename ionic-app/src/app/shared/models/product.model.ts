import { ProductImage } from './product-image.model';
import { ProductShipping } from './product-shipping.model';
import { Review } from './review.model';
import { SubCategory } from './subCategory.model';
export class Product{
  id!: number;
  subCategory!: SubCategory;
  name!: string;
  description!: string;
  stock!: number;
  returnProduct!: boolean;
  usedProduct!: boolean;
  brand!: string;
  price!: number;
  reviewsAverage!: number;
  dateCreated!: Date;
  shipping!: ProductShipping;
  images!: ProductImage[];
  reviews!: Review[];
}
