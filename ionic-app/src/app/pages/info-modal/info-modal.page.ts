import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, PopoverController } from '@ionic/angular';
import { ModalService } from 'src/app/services/modal-service/modal.service';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.page.html',
  styleUrls: ['./info-modal.page.scss'],
})
export class InfoModalPage implements OnInit {

  message = '';
  closeBtnTitle = 'Fermer';
  targetPage = '';
  email = '';
  target = '';

  constructor(private navCtrl: NavController,
    private modalCtrl: ModalController, private popoverCtrl: PopoverController,
    private router: Router,
    private modalService: ModalService) { }

  ngOnInit() {
  }

  onClose(){
    if (this.targetPage.length > 1){
      this.router.navigateByUrl(this.targetPage);
    }
    if (this.target === 'for-otp' && this.email.length > 3){
      this.modalService.openValidateOtpModal(this.email);
    }
    this.modalCtrl.dismiss();
  }

  openValidateOtpModal(){
    this.modalService.openValidateOtpModal(this.email);
  }
}
