import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  message = '';

  constructor(private navCtrl: NavController,
    private modalCtrl: ModalController, private popoverCtrl: PopoverController) { }

  ngOnInit() {
  }

  onClose(){
    this.popoverCtrl.dismiss();
  }

}
