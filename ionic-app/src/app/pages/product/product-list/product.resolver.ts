import { SearchProductRequest } from '../../../shared/models/search-product.model';
import { ApiService } from './../../../services/api-service/api.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { AppConfigConstants } from 'src/app/shared/app-config-constants';

@Injectable()
export class ProductResolver implements Resolve<any> {
  searchProductRequest: SearchProductRequest |undefined;
  constructor(private router: Router,
              private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): any{
    let payload: SearchProductRequest = {
      categoryName: route.queryParams['cat'],
      subCategoryName: 'none',
      field: 'none',
      option: 'none',
      wilaya: 'none',
      onlyUsedProduct: false,
      limit: 0,
      offset: AppConfigConstants.PRODUCTS_PER_PAGE - 1
    }
    if (this.apiService.resetFilter){
      return this.apiService.getProductWithSearchFilters(payload);
    }
    else {
      this.apiService.getProductWithSearchFilters(this.apiService.searchProductRequest);
    }
  }
}
