import { ProductKwSearchResolver } from './product/product-kw-search/product-kw-search.resolver';
import { CategoriesResolve } from './../services/category-service/categories.resolve';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesPage } from './pages.page';
import { ProductResolver } from './product/product-list/product.resolver';
import { ProductViewResolver } from './product-view/product-view.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/pages/home',
    pathMatch: 'full'
  },
  {
    path: 'pages',
    component: PagesPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.AccountPageModule)
      },
      {
        path: 'info-modal',
        loadChildren: () => import('./info-modal/info-modal.module').then(m => m.InfoModalPageModule)
      },
      {
        path: 'popover',
        loadChildren: () => import('./popover/popover.module').then(m => m.PopoverPageModule)
      },
      {
        path: 'categories',
        resolve: {
          categoriesObjects: CategoriesResolve
        },
        loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesPageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'register',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
      },
      {
        path: 'products',
        resolve: { products: ProductResolver },
        loadChildren: () => import('./product/product-list/product-list.module').then(m => m.ProductListPageModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./product/product-details/product-details.module').then(m => m.ProductDetailsPageModule)
      },
      {
        path: 'product-kw-search',
        resolve: { products: ProductKwSearchResolver },
        loadChildren: () => import('./product/product-kw-search/product-kw-search/product-kw-search.module').then(m => m.ProductKwSearchPageModule)
      },
      {
        path: 'tab1',
        loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'account-validation',
        loadChildren: () => import('./account-validation/account-validation.module').then(m => m.AccountValidationPageModule)
      },
      {
        path: 'product-view',
        resolve: { product: ProductViewResolver },
        loadChildren: () => import('./product-view/product-view.module').then( m => m.ProductViewPageModule)
      },
      {
        path: '',
        redirectTo: '/pages/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'language-popover',
    loadChildren: () => import('./language-popover/language-popover.module').then(m => m.LanguagePopoverPageModule)
  },
  {
    path: 'reset-password-modal',
    loadChildren: () => import('./reset-password-modal/reset-password-modal.module').then(m => m.ResetPasswordModalPageModule)
  },
  {
    path: 'reset-password-with-email-modal',
    loadChildren: () => import('./reset-password-with-email-modal/reset-password-with-email-modal.module').then(m => m.ResetPasswordWithEmailModalPageModule)
  },
  {
    path: 'validate-otp-modal',
    loadChildren: () => import('./validate-otp-modal/validate-otp-modal.module').then(m => m.ValidateOtpModalPageModule)
  },
  {
    path: 'product-list',
    loadChildren: () => import('./product/product-list/product-list.module').then(m => m.ProductListPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  }






];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
