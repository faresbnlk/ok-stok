import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ProductItemModel, ProductListingModel } from 'src/app/pages/product/product-list/product-list.model';
import { ProductService } from 'src/app/pages/product/product.service';
import { AppConfigConstants } from 'src/app/shared/app-config-constants';
import { SubCategory } from 'src/app/shared/models/subCategory.model';

@Component({
  selector: 'app-listing-grid',
  templateUrl: './listing-grid.component.html',
  styleUrls: ['./listing-grid.component.scss'],
})
export class ListingGridComponent implements OnInit {

  @Input() columsNumber: number = 3;
  @Input() currentCatName = '';
  items: string[] = [];
  @Input() subCategories: SubCategory [] = [];
  subCategoriesSub: Subscription | undefined;
  dataIsLoading = false;

  products : Array<ProductItemModel> = [];
  constructor(private http: HttpClient,
    private router: Router,
    private productService: ProductService) {
  //   router.events.subscribe((val) => {
  //     if (val instanceof NavigationEnd){
  //       this.getSubCategoriesByCategoryName(this.currentCatName);
  //     }
  // });
  }

  async ngOnInit() {
    // this.subCategoriesSub = this.productService.subCategories.subscribe(subCats =>{
    //   console.log(subCats);
    //   this.subCategories = subCats;
    // },
    // error => {
    //   console.log(error);
    // })
    // await this.getSubCategoriesByCategoryName(this.currentCatName);
    //this.getFirstPageProducts(this.currentCatName);
  }


//   {
//     "categoryName": "COSMETICS_BEAUTY",
//     "subCategoryName": "none",
//     "field": "none",
//     "option": "DESC",
//     "onlyUsedProduct": false,
//     "page": 0,
//     "size": 2
// }

// getSubCategoriesByCategoryName(catName: string){
//   this.productService.getSubCategoriesByCategoryName(catName).subscribe(
//     response => {
//       this.subCategories = response;
//       //console.log(this.subCategories);
//     },
//     error => {
//       console.log(error);
//     }
//   )
// }

  getFirstPageProducts(catName: string){
    // this.http.get<any>(AppConfigConstants.API_BASE_URL + '/products/search/withCat?catName='+ catName).subscribe(
    //   response => {
    //     this.products = response._embedded.products;
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // )
  }

//http://localhost:8890/products/search/withCat?catName=WOMEN_CLOTHING

onLoadMore(){
    // let array = ['Item-x', 'Item-y', 'Item-2'];
    // this.items.push(...array);
    let size = 15;
    let pageNumber = 1;
    //http://localhost:8890/products?page=0&size=3
    this.http.get<any>(AppConfigConstants.API_BASE_URL + '/products?page='+ pageNumber + '&size=' + size).subscribe(
      response => {
        this.products = response._embedded.products;
      },
      error => {
        console.log(error);
      }
    )
  }

  private generateItems() {
    const count = this.items.length + 1;
    for (let i = 0; i < 2; i++) {
      this.items.push(`Item ${count + i}`);
    }
  }



}
