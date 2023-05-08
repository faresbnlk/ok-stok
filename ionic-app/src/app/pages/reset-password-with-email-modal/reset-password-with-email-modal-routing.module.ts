import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResetPasswordWithEmailModalPage } from './reset-password-with-email-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ResetPasswordWithEmailModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetPasswordWithEmailModalPageRoutingModule {}
