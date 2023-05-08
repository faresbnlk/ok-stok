import { Category } from "src/app/shared/models/category.model";

export class ProductItemModel {
  id!: number;
  category!: Category;
  name!: string;
  description!: string;
  stock!: number;
  returnProduct!: boolean;
  images!: Array<any>;
  price!: number;
  brand!: string;
}

export class ProductListingModel {
  items: Array<ProductItemModel> = [
    new ProductItemModel(),
    new ProductItemModel(),
    new ProductItemModel(),
    new ProductItemModel()
  ];

  constructor() {
  }
}
