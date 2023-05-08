import { TranslateConfigService } from './../../services/translate/translate.service';
import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-language-popover',
  templateUrl: './language-popover.page.html',
  styleUrls: ['./language-popover.page.scss'],
})
export class LanguagePopoverPage implements OnInit {

  languages: { text: string; value: string; img: string; }[] | undefined;
  selectedLanguage = '';

  constructor(private popoverCtrl: PopoverController,
    private translateConfigService: TranslateConfigService) { }


  ngOnInit() {
    this.languages = this.translateConfigService.getLanguages();
    this.selectedLanguage = this.translateConfigService.currentLang;
  }

  selectLanguage(lang: string) {
    this.translateConfigService.setLanguage(lang);
    this.popoverCtrl.dismiss();
  }

}
