import { Category } from "src/app/shared/models/category.model";

export class ProductDetailsModel {
  id!: number;
  category!: Category;
  name!: string;
  description!: string;
  stock!: number;
  returnProduct!: boolean;
  images!: Array<string>;
  brand!: string;
  showcaseImages: Array<{type: string, source: string}> = [
    // {
    //   type: '',
    //   source: ''
    // },
    // {
    //   type: '',
    //   source: ''
    // },
    // {
    //   type: '',
    //   source: ''
    // }
  ];
  // name: string;
  // brand: string;
  // price: number;
  // salePrice: number;
  // colorVariants: Array<{name: string, value: string, default: boolean}> = [
  //   {
  //     name: '',
  //     value: '',
  //     default: false
  //   },
  //   {
  //     name: '',
  //     value: '',
  //     default: false
  //   },
  //   {
  //     name: '',
  //     value: '',
  //     default: false
  //   }
  // ];
  // sizeVariants: Array<{name: string, value: string, default: boolean}> = [
  //   {
  //     name: '',
  //     value: '',
  //     default: false
  //   },
  //   {
  //     name: '',
  //     value: '',
  //     default: false
  //   },
  //   {
  //     name: '',
  //     value: '',
  //     default: false
  //   }
  // ];
  // description: string;
  // careInstructions: string;
  // upc: string;
  // relatedProducts: Array<{id: number}> = [
  //   {
  //     id: null
  //   },
  //   {
  //     id: null
  //   }
  // ];

  constructor() {
  }
}
