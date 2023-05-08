import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductKwSearchPage } from './product-kw-search.page';

const routes: Routes = [
  {
    path: '',
    component: ProductKwSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductKwSearchPageRoutingModule {}
