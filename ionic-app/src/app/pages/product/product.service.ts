import { isPlatformServer } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { map, Observable, BehaviorSubject } from 'rxjs';
import { AppConfigConstants } from 'src/app/shared/app-config-constants';
import { SubCategory } from 'src/app/shared/models/subCategory.model';
import { TransferStateHelper } from 'src/app/shared/utils/transfer-state-helper';
import { ProductDetailsModel } from './product-details/product-details.model';
import { ProductListingModel } from './product-list/product-list.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private transferStateHelper: TransferStateHelper,
    private http: HttpClient
  ) { }
  };

