import { SharedService } from 'src/app/services/utils-service/shared.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { AppConfigConstants } from 'src/app/shared/app-config-constants';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { LoginResponse } from './payload/login-response';
import { User } from './payload/user';
import { IUser } from 'src/app/shared/models/user.interface';



export const TOKEN = 'token';
export const CURRENT_USER_EMAIL = 'current_user_email';
export const CURRENT_USER_ROLES: string = 'current_user_roles';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private accessToken: string = '';
  private logged = new ReplaySubject<boolean>(1);
  isLogged = this.logged.asObservable();


  constructor(private http: HttpClient,
    private sharedService: SharedService) { }


  basicJwtAuthLogin(user: any): Observable<LoginResponse> {
    return this.http.post<any>(AppConfigConstants.API_BASE_URL + '/auth/login', user).pipe(
      map(
        data => {
          localStorage.setItem(TOKEN, `Bearer ${data.accessToken}`);
          localStorage.setItem(CURRENT_USER_EMAIL, data.email);
          localStorage.setItem(CURRENT_USER_ROLES, data.roles);
          return data;
        }
      )
    )
  }

  getUserInfo() {
    return this.http.get<User>(AppConfigConstants.API_BASE_URL + '/user/me');
  }

  getIsVerifiedUser(){
    return this.http.get<boolean>(AppConfigConstants.API_BASE_URL + '/user/is-verified');
  }

  userSignup(user: any) {
    return this.http.post<any>(AppConfigConstants.API_BASE_URL + '/auth/signup', user);
  }

  userSignupPhone(user: any) {
    return this.http.post<any>(AppConfigConstants.API_BASE_URL + '/auth/signup-phone', user);
  }

  getResetPasswordContact(contact: string): string {
    let result = /^\d+$/.test(contact.substring(1));
    if (result){
      return 'reset-password-phone';
    }
    else {return 'reset-password'};
  }

  getOtp(email: string) {
    let result = /^\d+$/.test(email.substring(1));
    if (result){
      return this.getOtpPhone(email);
    }
    else {return this.getOtpByEmail(email)};
  }

  getOtpByEmail(email: string) {
    return this.http.post<any>(AppConfigConstants.API_BASE_URL + '/auth/get-otp', email);
  }

  getOtpPhone(phone: string) {
    return this.http.post<any>(AppConfigConstants.API_BASE_URL + '/auth/get-otp-phone', phone);
  }

  getVerificationLink(email: any) {
    return this.http.post<any>(AppConfigConstants.API_BASE_URL + '/auth/send-email', email);
  }

  submitOtp(body: any) {
    return this.http.post<any>(AppConfigConstants.API_BASE_URL + '/auth/validate-otp', body);
  }

  resetPassword(body: any, endPoint: string) {
    return this.http.post<any>(AppConfigConstants.API_BASE_URL + '/auth/' + endPoint, body);
  }

  getAuthToken() {
    let token: any
    if (localStorage.getItem(TOKEN))
      token = localStorage.getItem(TOKEN);
    return token;
  }

  setAuthToken(token: string) {
    localStorage.setItem(TOKEN, token);
  }

  isUserLoggedIn() {
    let token = localStorage.getItem(TOKEN)
    if (token === null || token.includes('undefined'))
      return false;
    else
      return true;
  }

  logout() {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(CURRENT_USER_EMAIL);
    localStorage.removeItem(CURRENT_USER_ROLES);
  }
}
