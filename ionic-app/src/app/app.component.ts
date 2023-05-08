import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/services/utils-service/shared.service';
import { TranslateConfigService } from './services/translate/translate.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { MenuController, Platform, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AppConfigConstants } from './shared/app-config-constants';
import { Subject, Subscription } from 'rxjs';
import { ToastService } from './services/toast-service/toast.service';
import { Error } from './shared/errors-constants';
import { User } from './services/htpp/authentication/payload/user';
import { AuthService } from './services/htpp/authentication/auth.service';
import { ModalService } from './services/modal-service/modal.service';
import { LoaderInterceptorService } from './services/htpp/loader-interceptor.service';
import { HttpInterceptorService } from './services/htpp/http-intercepter.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  isPhone = false;
  public page: string;
  loggedEventSubscription: Subscription | undefined;
  loggedIn = false;
  isVerifiedUser = false;
  isLoading = true;
  currentUser!: User;

  constructor(private menuCtrl: MenuController,
             private plt: Platform, private router: Router,
             private platform: Platform,
             public translateConfigService: TranslateConfigService,
             private popoverCtrl: PopoverController,
             public sharedService: SharedService,
             private storage: Storage,
             private toastService: ToastService,
             private translateService: TranslateService,
             private authService: AuthService,
             private modalService: ModalService,
             private http: HttpClient,
             public httpInterceptorService: HttpInterceptorService)
             {
              this.sharedService.getIsBackendAlive();
              this.page = this.router.url;
              this.loggedEventSubscription = this.sharedService.getIsLoggedInEvent().subscribe(() => {
                this.loggedIn = true;
              });
              router.events.subscribe((val) => {
              if (val instanceof NavigationEnd || val instanceof NavigationStart){
                if (val.url.includes('home')){
                  this.sharedService.getIsBackendAlive();
                }
              }
              });

             this.initializeApp();
             }

  async ngOnInit(){
    this.storage.create();
    const width = this.plt.width();
    this.getWindowWidth(width);
    this.loggedIn = await this.authService.isUserLoggedIn();
  }

  openAccountVerificationModal(email: string){
    if(this.isVerifiedUser === false)
    this.modalService.openValidateAccountModal(email);
  }

  changeDirFromLang(lang: any){
    let dir = lang === 'ar' ? 'rtl' : 'ltr';
    return dir
  }

  getUserInfo(): any{
    if (this.loggedIn){
      this.authService.getUserInfo().subscribe(
        (data: any) => {
          this.currentUser = data;
          this.isVerifiedUser = data.emailVerified;
          this.isLoading = false;
          return data;
        },
        (err: { error: string; }) => {
          this.currentUser = JSON.parse(err.error).message;
        }
      );
    }
  }

  getWindowWidth(width: number){
    if (width > 768) {
      this.isPhone = false;
    } else {
      this.isPhone = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event: { target: { innerWidth: any; }; }) {
    const newWidth = event.target.innerWidth;
    this.getWindowWidth(newWidth);
  }

  initializeApp(){
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
      this.translateConfigService.setInitialAppLanguage();
    })
  }

  getIsVerifiedUser(){
    this.http.get<boolean>(AppConfigConstants.API_BASE_URL + '/user/is-verified').subscribe(
      response => {
        this.isVerifiedUser = response;
      },
      error => {
        return false;
        this.toastService.showErrorToast(this.translateService.instant(Error.DEFAULT_ERROR));
      }
    )
  }



}
