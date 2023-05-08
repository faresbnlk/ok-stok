import { SharedService } from 'src/app/services/utils-service/shared.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, NavigationExtras } from '@angular/router';
import { InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CategoryService } from 'src/app/services/category-service/category.service';
import { TranslateConfigService } from 'src/app/services/translate/translate.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-product-kw-search',
  templateUrl: './product-kw-search.page.html',
  styleUrls: ['./product-kw-search.page.scss'],
})
export class ProductKwSearchPage implements OnInit {

  checked: any;
  isUsedChecked: boolean = false;
  keyword = '';
  rangeValue = 1;
  showProducts = true;
  wilayaNames: string[] = [];
  selectedWilaya = '';
  wilayaInput = '';
  onCursor = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    public translateConfigService: TranslateConfigService,
    public apiService: ApiService,
    private modalCtrl: ModalController,
    private langaueService: TranslateConfigService,
    private sharedService: SharedService) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        // this.resetSearchSelectedItems();
        // this.apiService.resetSearchProductKeyWordRequest();
        // this.ngOnInit();
      }
    });
    route.params.subscribe(param => {
      // if (route.component && route.component.name){
      //   if (route.component.name !== 'ProductKwSearchPage'){
      //     console.log('Reset items ! ');
      //     this.resetSearchSelectedItems();
      //     this.apiService.resetSearchProductKeyWordRequest();
      //   }
      // }
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params['kw']) {
        this.keyword = params['kw'];
      }
    });

    this.route.params.subscribe(param => {
      if (this.route.component && this.route.component.name){
        if (this.route.component.name !== 'ProductKwSearchPage' && this.route.component.name !== 'ProductViewPage'){
          console.log('Reset items ! ');
          this.resetSearchSelectedItems();
          // this.apiService.resetSearchProductKeyWordRequest();
        }
      }
    });
  }

  onIsUsedChecked(event: any) {
    if (event.detail.checked) {
      this.isUsedChecked = true;
    }
    else {
      this.isUsedChecked = false;
    }
    this.apiService.searchProductWithKeyWordRequest.onlyUsedProduct = this.isUsedChecked;
    this.apiService.getProductsByKeyword();
  }

  resetSearchSelectedItems() {
    this.checked = null;
    this.rangeValue = 0;
    this.onCancelselectedWilaya();
  }

  onResetSearchProduct() {
    this.resetSearchSelectedItems();
    this.apiService.resetSearchProductKeyWordRequest();
    this.apiService.getProductsByKeyword();
  }

  activateUsedCheckedButton(): boolean {
    if (
      (this.apiService.searchProductWithKeyWordRequest.onlyUsedProduct !== false) ||
      (this.selectedWilaya !== '') || (this.wilayaNames.length > 0)
    ) {
      return true;
    }
    else {
      return false;
    }
  }

  onIonInfinite(ev: any) {
    this.apiService.onSearchProductKeyWordNextPage();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  getFirstImageUrl(product: any) {
    if (product && product.images && product.images[0] && product.images[0].url) {
      return product.images[0].url.split('|')[0];
    }
    else {
      return "assets/images/product-default-image.png";
    }
  }

  onProductObjectClick(product: Product) {
    this.apiService.getProductById(product.id);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        productId: product.id
      }
    };
    this.router.navigate(['pages/product-view'], navigationExtras);
  }

  replaceSpecialChar(name: string) {
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

  onCursorAppear() {
    this.showProducts = false;
  }

  onCursorLeave() {
    this.onCancelselectedWilaya();
    this.showProducts = true;
  }

  onWilClick(wil: string) {
    this.wilayaNames = [];
    this.selectedWilaya = wil;
    this.apiService.searchProductWithKeyWordRequest.wilaya = this.selectedWilaya;
    this.apiService.getProductsByKeyword();
    this.showProducts = true;
  }

  onCancelselectedWilaya() {
    this.selectedWilaya = '';
    this.wilayaInput = '';
  }

  onSearchWilaya(event: any) {
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
        ) {
          let wil = this.langaueService.currentLang === 'ar' ? elem.wilayaArabic : elem.wilaya;
          if (!result.includes(wil)) {
            result.push(wil);
          }
        }
      }));
    if (wilayaInput.length > 0) {
      this.wilayaNames = result;
    }
    else { this.wilayaNames = [] }
  }

}
