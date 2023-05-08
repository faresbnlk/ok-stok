import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetPasswordWithEmailModalPageRoutingModule } from './reset-password-with-email-modal-routing.module';

import { ResetPasswordWithEmailModalPage } from './reset-password-with-email-modal.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetPasswordWithEmailModalPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [ResetPasswordWithEmailModalPage]
})
export class ResetPasswordWithEmailModalPageModule {}
