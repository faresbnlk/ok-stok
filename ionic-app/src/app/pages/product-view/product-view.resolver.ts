import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-service/api.service';
import { AppConfigConstants } from 'src/app/shared/app-config-constants';

@Injectable()
export class ProductViewResolver implements Resolve<any> {
  constructor(private router: Router,
              private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): any{

    let productId = route.queryParams['productId']
    return this.apiService.getProductById(productId);
  }
}
