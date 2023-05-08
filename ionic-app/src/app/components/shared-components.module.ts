import { ListingGridComponent } from './listing-grid/listing-grid.component';
import { AccountValidationModalComponent } from './account-validation-modal/account-validation-modal.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MobileHeaderComponent } from './mobile-header/mobile-header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgOtpInputModule } from 'ng-otp-input';
import { MaintenaceComponent } from './maintenace/maintenace.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MobileHeaderComponent,
    AccountValidationModalComponent,
    ListingGridComponent,
    MaintenaceComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
    NgOtpInputModule,
    TranslateModule
  ],
  exports: [
    HeaderComponent,
    MobileHeaderComponent,
    AccountValidationModalComponent,
    ListingGridComponent,
    MaintenaceComponent
  ]
})
export class SharedComponentsModule { }
