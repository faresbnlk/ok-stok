import { catchError, delay, map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, ReplaySubject, tap } from 'rxjs';
import { AppConfigConstants } from 'src/app/shared/app-config-constants';
import { LoaderInterceptorService } from '../htpp/loader-interceptor.service';
import { SubCategory } from 'src/app/shared/models/subCategory.model';
import { SharedService } from '../utils-service/shared.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: any;
  constructor(private http: HttpClient,
              private loaderInterceptorService : LoaderInterceptorService,
              private sharedService: SharedService,
              private router: Router) { }

  getAllCategories(){
    return this.http.get<any>(AppConfigConstants.API_BASE_URL + '/cat/all')
      .pipe(
        map((response: any) => {
          this.categories = response;
          return this.categories;
        }),
        catchError((err, caught) => {
          this.sharedService.isBackendAlive = false;
          return EMPTY;

        })
      );
  }

  public getSubCategoriesByCategoryName(catName: string): Observable<SubCategory[]>{
    let httpParams = new HttpParams().set('catName', catName);
    return this.http.get<SubCategory[]>(AppConfigConstants.API_BASE_URL + '/cat/sub/by-catName', {params:httpParams})
  };

  translateCategories(categories: any[]){
    categories.forEach(cat => {
      let translated_name = '';
      translated_name = 'CATEGORY.' + cat.name + '.NAME';
      cat.name = translated_name;
    });
    return categories;
  }
}
