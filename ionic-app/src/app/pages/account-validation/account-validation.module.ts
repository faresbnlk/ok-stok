import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountValidationPageRoutingModule } from './account-validation-routing.module';

import { AccountValidationPage } from './account-validation.page';
import { NgOtpInputModule } from 'ng-otp-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountValidationPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    NgOtpInputModule
  ],
  declarations: [AccountValidationPage]
})
export class AccountValidationPageModule {}
