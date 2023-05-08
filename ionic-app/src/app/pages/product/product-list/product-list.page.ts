import { SearchProductRequest } from 'src/app/shared/models/search-product.model';
import { SubCategory } from './../../../shared/models/subCategory.model';
import { AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { ApiService } from 'src/app/services/api-service/api.service';
import { InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { Product } from 'src/app/shared/models/product.model';
import { CategoryService } from 'src/app/services/category-service/category.service';
import { TranslateConfigService } from 'src/app/services/translate/translate.service';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-fashion-listing',
  templateUrl: './product-list.page.html',
  styleUrls: [
    './styles/product-listing.page.scss',
    './styles/product-listing.shell.scss'
  ]
})
export class ProductListingPage implements OnInit{

  subscriptions!: Subscription;
  currentCatName = '';
  subCategories: SubCategory[] = [];
  subCategoriesSub: Subscription | undefined;
  dataIsLoading = false;
  searchProductRequest: SearchProductRequest | undefined;
  products: Product [] = [];
  selectedSubCatName = 'none';
  sortedWithPriceASC: boolean = false;
  sortedWithPriceDESC: boolean = false;
  sortedWithReviewsAverage: boolean = false;
  isUsedProductSelected: boolean = false;
  isUsedChecked: boolean = false;
  selectedSub: any;
  selectedField: any;
  checked: any;
  showLocationFilter = false;
  resetKnob = true;
  showProducts = true;
  wilayaNames: string[] = [];
  selectedWilaya = '';
  wilayaInput = '';
  onCursor = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService,
              public apiService: ApiService,
              private modalCtrl: ModalController,
              private langaueService: TranslateConfigService,
              private location: Location) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd){
        this.ngOnInit();
      }
      route.params.subscribe(param => {
        // console.log(route);
        if (route.component && route.component.name === 'ProductListingPage' && apiService.resetFilter){
          this.resetSearchSelectedItems();
        }
      });
    });
    router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event) => {
      console.log('prev:', event);
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params && params['cat']) {
        this.currentCatName = params['cat'];
      }
    });
    this.categoryService.getSubCategoriesByCategoryName(this.currentCatName).subscribe(subCats => {
      this.subCategories = subCats;
    });
  }

  onProductObjectClick(product: Product) {
    this.apiService.resetFilter = false;
    console.log(product);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        productId: product.id
      }
    };
    this.router.navigate(['pages/product-view'], navigationExtras);
  }

  getFirstImageUrl(product: any){
    if (product && product.images && product.images[0] && product.images[0].url){
      return product.images[0].url.split('|')[0];
    }
    else {
      return "assets/images/product-default-image.png";
    }
  }

  onSearchFiltersChange() {
    this.apiService.onProductNextPage();
  }

  onSelectSubCat(event:any) {
    if (this.selectedSubCatName !== undefined){
      this.selectedSubCatName = event.target.value.slice(1, -1);
      this.apiService.searchProductRequest.subCategoryName = this.selectedSubCatName;
      this.apiService.getProductByFilter();
    }
  }

  onIsUsedChecked(event: any){
    if(this.checked !== undefined){
      if (event.detail.checked){
        this.isUsedChecked = true;
    }
    else{
      this.isUsedChecked = false;
    }
    this.isUsedChecked;
    this.apiService.searchProductRequest.onlyUsedProduct = this.isUsedChecked;
    this.apiService.getProductByFilter();
    }
  }

  activateResetSearchButton(): boolean{
    if(
        (this.apiService.searchProductRequest.subCategoryName !== 'none'
          && !(this.apiService.searchProductRequest.subCategoryName.length == 0)) ||
        (this.apiService.searchProductRequest.field !== 'none') ||
        (this.apiService.searchProductRequest.onlyUsedProduct !== false) ||
        (this.selectedWilaya !== '') || (this.wilayaNames.length > 0)
      ){
        return true;
    }
    else {
      return false;
    }
  }

  onSelectSort(event:any) {
    if (this.selectedField !== undefined){
      let value = event.target.value;
      let field = 'none';
      let option = 'none';
      if (value === 'price_desc'){
        field = 'price';
        option = 'DESC';
      }
      if (value === 'price_asc'){
        field = 'price';
        option = 'ASC';
      }
      if (value === 'reviews_avrg'){
        field = 'reviews_average';
        option = 'DESC';
      }
      this.apiService.searchProductRequest.field = field;
      this.apiService.searchProductRequest.option = option;
      this.apiService.getProductByFilter();
    }
  }

  resetSearchSelectedItems(){
    this.selectedSub = null;
    this.selectedField = null;
    this.checked = null;
    this.onCancelselectedWilaya();
    this.showProducts = true;
    this.onCursor = false;
  }

  onResetSearchProduct(){
    this.resetSearchSelectedItems();
    this.apiService.resetSearchProductRequest();
    this.apiService.getProductByFilter();
  }

  onIonInfinite(ev: any) {
    this.apiService.onProductNextPage();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  onDeclineLocation(){
    this.modalCtrl.dismiss();
  }

  replaceSpecialChar(name: string){
    let wilayaName = name.toLocaleLowerCase();
    for (var i = 0; i < wilayaName.length; i++) {
      switch (wilayaName[i]) {
        case "â":
          wilayaName = wilayaName.replace("â", "a");
          break;
        case 'é':
          wilayaName = wilayaName.replace('é', 'e');
          break;
        case "à":
          wilayaName = wilayaName.replace("à", "a");
          break;

        case "è":
          wilayaName = wilayaName.replace("è", "e");
          break;
        case "ù":
          wilayaName = wilayaName.replace("ù", "u");
          break;
        case "ê":
          wilayaName = wilayaName.replace("ê", "e");
          break;
        case "î":
          wilayaName = wilayaName.replace("î", "i");
          break;
        case "ô":
          wilayaName = wilayaName.replace("ô", "o");
          break;
        case "û":
          wilayaName = wilayaName.replace("û", "u");
          break;
        case "ï":
          wilayaName = wilayaName.replace("ï", "i");
          break;
        case "ë":
          wilayaName = wilayaName.replace("ë", "e");
          break;
        case "ü":
          wilayaName = wilayaName.replace("ü", "u");
          break;
        case "ç":
          wilayaName = wilayaName.replace("ç", "c");
          break;
        case "œ":
          wilayaName = wilayaName.replace("œ", "oe");
          break;
      }
    }
    return wilayaName;
  }

  onCursorAppear(){
    this.onCursor = true;
    this.showProducts = false;
  }

  onCursorLeave(){
    this.onCancelselectedWilaya();
    this.showProducts = true;
  }

  onWilClick(wil: string){
    this.selectedWilaya = wil;
    this.wilayaNames = [];
    this.apiService.searchProductRequest.wilaya = this.selectedWilaya;
    this.apiService.getProductByFilter();
    this.showProducts = true;
  }

  onCancelselectedWilaya(){
    this.selectedWilaya = '';
    this.wilayaInput = '';
  }


  onSearchWilaya(event: any){
    const wilayaInput = event.detail.value.toLocaleLowerCase();
    let result: string[] = [];
    this.apiService.getAllCities();
    this.apiService.cities
      .filter((elem => {
        const wilayaArabic = elem.wilayaArabic.toLocaleLowerCase();
        const wilayaName = elem.wilaya.toLocaleLowerCase();
        const wilaya = this.replaceSpecialChar(wilayaName);
          if (
            wilaya.includes(wilayaInput) || wilayaName.includes(wilayaInput) ||
            wilayaArabic.toLocaleLowerCase().includes(wilayaInput) ||
            wilayaInput.includes(wilaya) || wilayaInput.includes(wilayaName) ||
            wilayaInput.includes(wilayaArabic)
            ){
              let wil = this.langaueService.currentLang === 'ar' ? elem.wilayaArabic : elem.wilaya;
              if (!result.includes(wil)){
                result.push(wil);
              }
          }
      }));
      if (wilayaInput.length > 0){
        this.wilayaNames = result;
      }
      else {this.wilayaNames = []}
  }

}
function routeChanged(arg0: any): void {
  throw new Error('Function not implemented.');
}

