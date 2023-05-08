import { SearchProductRequest } from '../../../shared/models/search-product.model';
import { ApiService } from '../../../services/api-service/api.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { LocationRequest } from 'src/app/shared/models/location.model';
import { SearchProductWithKeyWordRequest } from 'src/app/shared/models/search-product-with-kw.model';
import { AppConfigConstants } from 'src/app/shared/app-config-constants';


@Injectable()
export class ProductKwSearchResolver implements Resolve<any> {
  constructor(private router: Router,
    private apiService: ApiService) { }

  resolve(route: ActivatedRouteSnapshot): any {
    let payload: SearchProductWithKeyWordRequest = {
      keyWord: route.queryParams['kw'],
      onlyUsedProduct: false,
      limit: 0,
      offset: AppConfigConstants.PRODUCTS_PER_PAGE - 1,
      wilaya: 'none'
    }


    this.apiService.searchProductWithKeyWordRequest = payload;
    return this.apiService.getProductsByKeyword();
  }
}
