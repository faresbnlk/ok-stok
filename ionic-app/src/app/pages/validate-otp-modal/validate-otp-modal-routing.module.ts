import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidateOtpModalPage } from './validate-otp-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ValidateOtpModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidateOtpModalPageRoutingModule {}
