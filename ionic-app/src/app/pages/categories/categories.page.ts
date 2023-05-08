import { ApiService } from 'src/app/services/api-service/api.service';
import { ProductService } from '../product/product.service';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivationStart, NavigationEnd, NavigationExtras, Router, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category-service/category.service';
import { Category } from 'src/app/shared/models/category.model';
import { SubCategory } from 'src/app/shared/models/subCategory.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: [
    './styles/categories.page.scss',
    './styles/categories.shell.scss',
    './styles/categories.responsive.scss'
  ],
})
export class CategoriesPage implements OnInit {

  showLoader = true;
  showCategories = true;
  keyWord = '';
  categoriesObjects$: Observable<Category[]> | undefined;
  categories: Category[] | undefined;
  subCategories: SubCategory[]= [];
  // searchsuggestions: string[]= [];
  constructor(public categoryService: CategoryService,
    private router: Router,
    public apiService: ApiService) {
      router.events.subscribe((val) => {
        if (val instanceof NavigationEnd){
          this.apiService.productNames = [];
          this.keyWord = '';
          this.ngOnInit();
        }
    });
   }

   @ViewChild(RouterOutlet) outlet: RouterOutlet | undefined;


   ngOnInit(): void {
     this.router.events.subscribe(e => {
       if (e instanceof ActivationStart && e.snapshot.outlet === "categories")
         this.outlet!.deactivate();
     });
    //  this.apiService.resetFilter = true;
     this.apiService.getAllCities();

   }

  onCategoryClick(catName: string){
    this.apiService.keepProductSearchFilters = false;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        cat: catName
      }
    };
    this.router.navigate(['pages/products'], navigationExtras);
  }

  onKeyWordClick(keyWord: string){
    this.keyWord = keyWord;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        kw: this.keyWord
      }
    };
    this.router.navigate(['pages/product-kw-search'], navigationExtras);
  }

  onSearchInputChange(event: any){
    let keyWord = event.detail.value;
    if (keyWord.length > 0){
      this.apiService.getProductsNameByKeyword(keyWord);
    }
    else{
      this.apiService.productNames = [];
    }
    // this.searchsuggestions = this.apiService.productNames;
  }

  onCursorAppear(){
    this.showCategories = false;
  }

  onCursorLeave(){
    this.showCategories = true;
  }

  selectedKeyWord(keyWord: string){
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if (this.bottomReached()) {
    }
  }

  bottomReached(): boolean {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
  }
}
