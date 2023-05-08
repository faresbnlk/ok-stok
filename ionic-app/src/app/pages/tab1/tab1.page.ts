import { ModalService } from './../../services/modal-service/modal.service';
import { Component } from '@angular/core';
import { NavController, ModalController, PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  message = 'Inscription réussie ! ' + '\n' + 'Merci de valider votre e-mail';
  constructor(private navCtrl: NavController,
    private modalCtrl: ModalController, private popoverCtrl: PopoverController,
    private madalService: ModalService) { }

  openModalInfo() {
    this.madalService.openModalInfo(this.message, '', '')
  }

  openModalInfoWithRedirection() {
    this.madalService.openModalInfoWithRedirection(this.message, '/pages/login')
  }

  async openPopoverInfo(event: Event) {
    this.madalService.openPopoverInfo(this.message, event);
  }

}
