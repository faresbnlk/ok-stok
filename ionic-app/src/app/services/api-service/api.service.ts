import { Product } from 'src/app/shared/models/product.model';
import { ToastService } from './../toast-service/toast.service';
import { LocationRequest } from 'src/app/shared/models/location.model';
import { SearchProductRequest } from '../../shared/models/search-product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AppConfigConstants } from 'src/app/shared/app-config-constants';
import { SearchProductWithKeyWordRequest } from 'src/app/shared/models/search-product-with-kw.model';
import { Geolocation } from '@capacitor/geolocation';
import { City } from 'src/app/shared/models/city.model';
import { get } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,
    private toastService: ToastService) { }

  products: any;
  productNames = [];
  wilayas = [];
  cities: City[] = [];
  searchProductRequest!: SearchProductRequest;
  searchProductWithKeyWordRequest!: SearchProductWithKeyWordRequest;
  page = 0;
  productId: number | undefined;
  product: Product | undefined;
  productImagesUrls: string[] = [];
  keepProductSearchFilters = true;
  defaultProductImage = 'assets/images/product-default-image.png';
  resetFilter = true;

  getProductWithSearchFilters(searchProductRequest: SearchProductRequest){
    this.searchProductRequest = searchProductRequest;
    return this.http.post<any>(AppConfigConstants.API_BASE_URL + '/product/find-with-creteria', this.searchProductRequest)
      .pipe(
        map((response: any) => {
          this.products = response;
          return this.products;
        })
      );
  }

  getKeepProductSearchfilters(){
    return (this.keepProductSearchFilters && this.products);
  }

  // getProductBuId(productId: number){
  //   return this.http.get<any>(AppConfigConstants.API_BASE_URL + '/product/find-by-id/' + productId.toString())
  //     .pipe(
  //       map((product: any) => {
  //         this.product = product;
  //         return this.product;
  //       })
  //     );
  // }


  getProductById(productId: number){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(AppConfigConstants.API_BASE_URL + '/product/find-by-id', productId, {headers: headers})
      .pipe(
        map((product: any) => {
          this.product = product;
          this.getProductImages(product);
          return this.product;
        })
      );
  }

  getProductImages(product: Product){
    const images = get(product, 'images');
    if (images && images.length > 0){
      images.forEach(img => {
        this.productImagesUrls.push(img.url);
      });
    }
    else {
      this.productImagesUrls.push(this.defaultProductImage);
    }
  }

  getAllCities(){
    return this.http.get<any>('../../../assets/data/cities.json').subscribe(response => {
      this.cities = response;
    },
    error => {
      console.log(error);
    })
  }

  getProductByFilter(){
    return this.http.post<any>(AppConfigConstants.API_BASE_URL + '/product/find-with-creteria', this.searchProductRequest)
    .subscribe(response => {
      this.products = response;
    })
  }

  resetSearchProductRequest(){
    this.searchProductRequest.subCategoryName = 'none';
    this.searchProductRequest.field = 'none';
    this.searchProductRequest.option = 'none';
    this.searchProductRequest.onlyUsedProduct = false;
    this.searchProductRequest.limit = 0;
    this.searchProductRequest.wilaya = 'none';
  }

  resetSearchProductKeyWordRequest(){
    this.searchProductWithKeyWordRequest.onlyUsedProduct = false;
    this.searchProductWithKeyWordRequest.limit = 0;
    this.searchProductWithKeyWordRequest.wilaya = 'none';
  }

  onProductNextPage(){
    this.page = this.page + 1;
    this.searchProductRequest.limit = this.page * AppConfigConstants.PRODUCTS_PER_PAGE;
    this.searchProductRequest.offset = this.page * AppConfigConstants.PRODUCTS_PER_PAGE + AppConfigConstants.PRODUCTS_PER_PAGE - 1;
    return this.http.post<any>(AppConfigConstants.API_BASE_URL + '/product/find-with-creteria', this.searchProductRequest).subscribe(response => {
      this.products.push(...response);
    })
  }

  onSearchProductKeyWordNextPage(){
    this.searchProductWithKeyWordRequest.limit = this.page * AppConfigConstants.PRODUCTS_PER_PAGE;
    this.searchProductWithKeyWordRequest.offset = this.page * AppConfigConstants.PRODUCTS_PER_PAGE + AppConfigConstants.PRODUCTS_PER_PAGE - 1;
    return this.http.post<any>(AppConfigConstants.API_BASE_URL + '/product/find-with-kw', this.searchProductWithKeyWordRequest).subscribe(response => {
      this.products.push(...response);
    })
  }

  getProductsNameByKeyword(keyword: string){
    return this.http.post<any>(AppConfigConstants.API_BASE_URL + '/product/products-name-kw', keyword)
    .subscribe(response => {
      if(response){
        this.productNames = response;
      }
    })
  }

  getProductsByKeyword(){
    return this.http.post<any>(AppConfigConstants.API_BASE_URL + '/product/find-with-kw', this.searchProductWithKeyWordRequest)
    .subscribe(response => {
      this.products = response;
    })
  }
}
