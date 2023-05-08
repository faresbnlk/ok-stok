import { AccountValidationModalComponent } from './../../components/account-validation-modal/account-validation-modal.component';
import { AccountValidationPage } from './../../pages/account-validation/account-validation.page';
import { ValidateOtpModalPage } from './../../pages/validate-otp-modal/validate-otp-modal.page';
import { ResetPasswordWithEmailModalPage } from './../../pages/reset-password-with-email-modal/reset-password-with-email-modal.page';
import { ResetPasswordModalPage } from './../../pages/reset-password-modal/reset-password-modal.page';
import { Injectable } from '@angular/core';
import { NavController, ModalController, PopoverController } from '@ionic/angular';
import { InfoModalPage } from 'src/app/pages/info-modal/info-modal.page';
import { PopoverPage } from 'src/app/pages/popover/popover.page';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  value= 0;

  constructor(private navCtrl: NavController,
    private modalCtrl: ModalController, private popoverCtrl: PopoverController) { }

  async openModalInfo(message: string, target: string, email: string){
    const modal = await this.modalCtrl.create({
      component: InfoModalPage,
      initialBreakpoint:0.35,
      breakpoints: [0, 0.35, 0.5, 0.75],
      handleBehavior: 'cycle',
      componentProps: {
        message: message,
        target: target,
        email: email
      }
    });
    modal.present();
  }

  async openResetPasswordModal(email: string){
    const modal = await this.modalCtrl.create({
      component: ResetPasswordModalPage,
      componentProps: {
        email: email
      }
    });
    modal.present();
  }

  async openResetPasswordModalWithEmail(){
    const modal = await this.modalCtrl.create({
      component: ResetPasswordWithEmailModalPage
    });
    modal.present();
  }

  async openValidateOtpModal(email: string){
    const modal = await this.modalCtrl.create({
      component: ValidateOtpModalPage,
      componentProps: {
        email: email
      }
    });
    modal.present();
  }

  async openValidateAccountModal(email: string){
    const modal = await this.modalCtrl.create({
      component: AccountValidationModalComponent,
      componentProps: {
        email: email
      }
    });
    modal.present();
  }


  async openModalInfoWithRedirection(message: string, targetPage: string){
    let cssClass = 'info-modal'
    const modal = await this.modalCtrl.create({
      component: InfoModalPage,
      initialBreakpoint:0.25,
      breakpoints: [0, 0.25, 0.5, 0.75],
      handleBehavior: 'cycle',
      componentProps: {
        message: message,
        targetPage: targetPage
      }
    });
    modal.present();
  }

  async openPopoverInfo(message: string, event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      componentProps: {
        message: message
      },
      event: event
    });
    popover.present();
  }

  pushWithFunction() {
    this.navCtrl.navigateForward(`/home/${this.value}`);
  }

  pushWithRouterLink() {

  }
}
