import { NavigationEnd, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { ApiService } from 'src/app/services/api-service/api.service';
import { get } from 'lodash';
import { Location } from "@angular/common";
import { Preferences } from '@capacitor/preferences';
import { AppConfigConstants } from 'src/app/shared/app-config-constants';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.page.html',
  styleUrls: ['./product-view.page.scss'],
})
export class ProductViewPage implements OnInit {

  product: Product | undefined;

  productImagesUrls: string[] = [];
  appCurrency = AppConfigConstants.APP_CURRENCY;
  productImagesUrlsTests: string[] = [
    'https://images-na.ssl-images-amazon.com/images/I/61plo8Xv4vL.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/51Yrqzea0zL.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/71mdBUQPvFL.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/51wOrcShPHL.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/41bHRYbeLgL.jpg'
  ];
  defaultProductImage = 'assets/images/product-default-image.png';
  productId: number | undefined;
  mainImg = this.productImagesUrlsTests[0];
  isFavorite = false;
  expanded = false;
  description = 'LE JEU LE PLUS DÉJANTÉ AU MONDE - Préparez-vous à lancer, rattraper, empiler, retourner, catapulter, rouler, sauter et souffler pour sortir gagnant du jeu d\'ambiance le plus délirant au monde !';

  constructor(private apiService: ApiService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private location: Location){

    this.activatedRoute.queryParams.subscribe(params => {
      this.productId = params['productId'];
    });
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
      this.apiService.getProductById(this.productId!);
      this.product = this.apiService.product;
      this.getProductImages();

      }
    });
  }

  ngOnInit() {
    this.product = this.apiService.product;
    this.checkIfIsFavorite();
  }

  getFirstImageUrl(){
    if (this.product && this.product.images && this.product.images[0] && this.product.images[0].url){
      return this.product.images[0].url.split('|')[0];
    }
    else {
      return this.defaultProductImage;
    }
  }

  getProductImages(){
    this.productImagesUrls = [];
    const images = get(this.product, 'images');
    if (images && images.length > 0){
      images.forEach(img => {
        this.productImagesUrls.push(img.url);
      });
    }
    else {
      this.productImagesUrls.push(this.defaultProductImage);
    }
  }

  onBack(){
    this.apiService.keepProductSearchFilters = true;
    this.location.back();
  }

  onAvatarClick(url: string){
    this.mainImg = url;
  }

  changeAvatarBorder(url: string){
    const borderColor = url === this.mainImg ? '#FA711C' : 'black';

    return borderColor;
  }

  onFavoriteClick(){
    if (this.isFavorite){
      this.removeProductFromFavorite();
      this.isFavorite = false;
    }
    else {
      this.setProductToFavorite();
      this.isFavorite = true;

    }
  }

  // async getAllElements() {
  //   let keys = await Preferences.keys();
  //   keys.keys.forEach(elem => {
  //     console.log(elem);
  //   })
  // }

async checkIfIsFavorite(){
    let key = this.product!.id.toString();
    let ret = await Preferences.get({ key: key });
    if (ret.value) {
      this.isFavorite = true;
    }
    else {this.isFavorite = false}
    return this.isFavorite;
  }

setProductToFavorite() {
  let key = this.product!.id.toString();
  Preferences.set({key :key, value : this.product!.id.toString()});
}

removeProductFromFavorite(){
  let key = this.product!.id.toString();
  Preferences.remove({key :key});
}

expandText(){
  this.expanded = !this.expanded;
}

get descriptionDivHeight() {
  return this.expanded ? 'auto' : '15vh';
}

}
