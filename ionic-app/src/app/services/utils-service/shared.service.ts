import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { catchError, EMPTY, filter, map, Observable, Subject } from 'rxjs';
import { AppConfigConstants } from 'src/app/shared/app-config-constants';
import { UserService } from '../htpp/authentication/user.service';
import { ToastService } from '../toast-service/toast.service';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private userService: UserService,
              private http: HttpClient,
              private translateService: TranslateService,
              private toastService: ToastService,
              private router: Router) {
              router.events.subscribe((val) => {
                if (val instanceof NavigationEnd) {
                  this.notProductViewPage = router.url.includes('product-view') ? false : true;
                }
              });
  }

  private loggedInSubject = new Subject<any>();
  isBackendAlive = false;
  notProductViewPage = true;

  sendIsLoggedInEvent(){
    this.loggedInSubject.next(true);
  }

  getIsLoggedInEvent(): Observable<any>{
    return this.loggedInSubject.asObservable();
  }

  getIsBackendAlive(){
    return this.http.get<any>(AppConfigConstants.API_BASE_URL + '/auth/alive')
      .pipe(
        map((response: any) => {
          if (response === true){
            this.isBackendAlive = response;
          }
          return this.isBackendAlive;
        }),
        catchError((err, caught) => {
          this.isBackendAlive = false;
          return EMPTY;

        })
      );
  }

  //getIsBackendAlive(){
  //   this.http.get<any>(AppConfigConstants.API_BASE_URL + '/auth/alive')
  //   .subscribe(response => {
  //     if (response['type'] === 0){
  //       this.isBackendAlive = false;
  //     }
  //     if (response === true){
  //       this.isBackendAlive = true;
  //     }
  //   },
  //   error => {
  //     if (error.status === 0){
  //       this.isBackendAlive = false;
  //     }
  //   });
  // }



}
