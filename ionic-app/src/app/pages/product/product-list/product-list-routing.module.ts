import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListingPage } from './product-list.page';

const routes: Routes = [
  {
    path: '',
    component: ProductListingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductListPageRoutingModule {}
