import { TranslateService } from '@ngx-translate/core';
import { UserService } from './../../services/htpp/authentication/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/htpp/authentication/auth.service';
import { ToastService } from 'src/app/services/toast-service/toast.service';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/utils-service/shared.service';
import { User } from 'src/app/services/htpp/authentication/payload/user';
import { Role } from 'src/app/services/htpp/authentication/payload/role';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  loggedEventSubscription: Subscription | undefined;
  loggedIn = false;
  currentUser: User = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    imageUrl: '',
    verifiedUser: false,
    roles: []
  };
  currentUserRoles = '';

  dataIsLoading = true;
  constructor(private authService: AuthService, private userService: UserService,
    private router: Router, private toastService: ToastService,
    private sharedService: SharedService, private translateService: TranslateService,
    private route: ActivatedRoute) {
      router.events.subscribe((val) => {
        if (val instanceof NavigationEnd){
          this.ngOnInit();
        }
    });
    }

  getUserInfo(){
    if (this.loggedIn){
      this.authService.getUserInfo().subscribe(
        response => {
        this.currentUser = response;
        this.getRoles(response.roles);
        this.dataIsLoading = false;
        },
        error => {
        }
      )
    }
  }

 getRoles(roles: Role[]){
    let result = '';
    roles.forEach((element: { name: string; }) => {
      result = result + element.name  + ' | ';
    });
    this.currentUserRoles = result;
  }

  async ngOnInit() {
    this.loggedIn = await this.authService.isUserLoggedIn();
    this.getUserInfo();
    this.loggedEventSubscription = this.sharedService.getIsLoggedInEvent().subscribe(() => {
      this.loggedIn = true;
    });
  if (this.authService.isUserLoggedIn()){
    this.getUserInfo();
  }
    this.dataIsLoading = false;
  }

  logout() {
    this.authService.logout();
    this.toastService.showInfoToast('Déconnecté');
    this.sharedService.sendIsLoggedInEvent();
    this.loggedIn = false;
    this.router.navigate(['/pages/home']);
  }



}
