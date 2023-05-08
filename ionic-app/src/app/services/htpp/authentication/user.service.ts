import { ToastService } from 'src/app/services/toast-service/toast.service';
import { Injectable } from '@angular/core';
import { AppConfigConstants } from 'src/app/shared/app-config-constants';
import { User } from './payload/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject, tap } from 'rxjs';
import { Error } from 'src/app/shared/errors-constants';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private user = new ReplaySubject<any>();

  constructor(private http: HttpClient, private translateService: TranslateService,
              private toastService: ToastService ) { }

  // getCurrentUser(): Observable<User> {
  //   return this.http.get<User>(AppConfigConstants.API_BASE_URL + '/user/me').pipe(
  //     tap(user => {
  //       return user;
  //     })
  //   );
  // }



}
