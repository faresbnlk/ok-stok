import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toaster: ToastController) { }

  async showSuccessToast(message: string) {
    const toast = await this.toaster.create({ message, duration:2000, cssClass: 'my-toast-success', position: 'bottom' });

    await toast.present();
  }

  async showErrorToast(message: string) {
    const toast = await this.toaster.create({ message, duration:2000, cssClass: 'my-toast-error', position: 'bottom' });

    await toast.present();
  }

  async showInfoToast(message: string) {
    const toast = await this.toaster.create({ message, duration:3000, cssClass: 'my-toast-info', position: 'bottom' });

    await toast.present();
  }

}
