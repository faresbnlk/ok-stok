import { TranslateConfigService } from './../../services/translate/translate.service';
import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { LanguagePopoverPage } from 'src/app/pages/language-popover/language-popover.page';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss'],
})
export class MobileHeaderComponent implements OnInit {

  languages: { text: string; value: string; img: string; }[] | undefined;
  selectedLanguage = '';

  constructor(private popoverCtrl: PopoverController,
    public translateConfigService: TranslateConfigService) { }


  ngOnInit() {
    this.languages = this.translateConfigService.getLanguages();
    this.selectedLanguage = this.translateConfigService.currentLang;
  }

  selectLanguage(lang: string) {
    this.translateConfigService.setLanguage(lang);
    this.popoverCtrl.dismiss();
  }

  async openLanguagePopover(event: any){
    const popover = await this.popoverCtrl.create({
      component: LanguagePopoverPage,
      event: event
    });
    await popover.present();
  }

}
