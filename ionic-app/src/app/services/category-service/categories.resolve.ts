import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { CategoryService } from "./category.service";
import { Injectable } from "@angular/core";
import { LoaderInterceptorService } from "../htpp/loader-interceptor.service";
import { Category } from "src/app/shared/models/category.model";

@Injectable({
  providedIn: 'root'
})
export class CategoriesResolve implements Resolve<Category[]> {
  constructor(private categoryService: CategoryService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]>{
    return this.categoryService.getAllCategories();
  }
}
