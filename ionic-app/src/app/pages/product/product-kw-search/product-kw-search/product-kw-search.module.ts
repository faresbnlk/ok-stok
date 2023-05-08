import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductKwSearchPageRoutingModule } from './product-kw-search-routing.module';

import { ProductKwSearchPage } from './product-kw-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductKwSearchPageRoutingModule
  ],
  declarations: [ProductKwSearchPage]
})
export class ProductKwSearchPageModule {}
