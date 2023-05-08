// import { SwiperModule } from './../../../../../node_modules/swiper/types/shared.d';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductListPageRoutingModule } from './product-list-routing.module';

import { ProductListingPage } from './product-list.page';
import { ProductService } from '../product.service';
import { SwiperModule } from 'swiper/angular';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProductListPageRoutingModule,
    SharedComponentsModule,
    SwiperModule
  ],
  declarations: [ProductListingPage],
  providers: [
    ProductService,
    SwiperModule
  ]
})
export class ProductListPageModule {}
