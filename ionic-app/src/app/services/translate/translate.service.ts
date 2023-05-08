import { SharedService } from 'src/app/services/utils-service/shared.service';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

const SELECTED_LANGUAGE = 'selected-language';

@Injectable({
  providedIn: 'root'
})
export class TranslateConfigService {

  currentLang = '';
  currentLangIsArabicEvent: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private translate: TranslateService,
              private storage: Storage,
              private sharedService: SharedService) {}

  setInitialAppLanguage(){
    let language = this.translate.getBrowserLang();
    this.translate.setDefaultLang('fr');
    this.storage.get(SELECTED_LANGUAGE).then( val => {
      if(val){
        this.setLanguage(val);
        this.currentLang = val;
      }
    });

  }

  getLanguages(){
    return [
      {text: 'Français', value: 'fr', img: '../../../assets/icon/french.png'},
      {text: 'العربية', value: 'ar', img: '../../../assets/icon/arabic.png'}
    ];
  }

  setLanguage(lang: string){
    this.translate.use(lang);
    this.currentLang = lang;
    if (lang === 'ar'){
      this.currentLangIsArabicEvent.next(true);
    }
    this.sharedService
    this.storage.set(SELECTED_LANGUAGE, lang);
  }
}
