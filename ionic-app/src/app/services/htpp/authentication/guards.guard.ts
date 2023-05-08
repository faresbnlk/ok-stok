import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/htpp/authentication/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppConfigConstants } from 'src/app/shared/app-config-constants';

@Injectable({
  providedIn: 'root'
})
export class GuardsGuard implements CanActivate {

  isUserVerified = false;

  constructor(private authService: AuthService,
    private http: HttpClient){

  }

  getIsVerifiedUser(){
      this.http.get<boolean>(AppConfigConstants.API_BASE_URL + '/user/is-verified').subscribe(
        response => {
          this.isUserVerified = response;
        },
        error => {
        }
      )
    }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.getIsVerifiedUser();
    return this.isUserVerified;
  }

}
