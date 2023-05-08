import { Category } from "./category.model";

export class SubCategory {
  id!: number;
  category!: Category;
  name!: string;
  description!: string;
}
