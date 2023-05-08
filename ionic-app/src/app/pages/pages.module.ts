import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './pages-routing.module';

import { PagesPage } from './pages.page';
import { LanguagePopoverPageModule } from './language-popover/language-popover.module';
import { IonIntlTelInputModule } from 'ion-intl-tel-input';
import { CategoriesResolve } from '../services/category-service/categories.resolve';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    LanguagePopoverPageModule,
    IonIntlTelInputModule
  ],
  declarations: [PagesPage],
  providers: [
    CategoriesResolve
  ]
})
export class PagesPageModule {}
