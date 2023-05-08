import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidateOtpModalPageRoutingModule } from './validate-otp-modal-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ValidateOtpModalPage } from './validate-otp-modal.page';
import { NgOtpInputModule } from 'ng-otp-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidateOtpModalPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    NgOtpInputModule
  ],
  declarations: [ValidateOtpModalPage]
})
export class ValidateOtpModalPageModule {}
