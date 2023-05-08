import { ErrorHandlerService } from './../../services/utils-service/error-handler.service';
import { SharedService } from './../../services/utils-service/shared.service';
import { AppConfigConstants } from '../../shared/app-config-constants';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/htpp/authentication/auth.service';
import { ToastService } from 'src/app/services/toast-service/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from 'src/app/services/modal-service/modal.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage {

  emailRegexp = AppConfigConstants.EMAIL_REGEX_VALIDATION;
  phoneRegex = AppConfigConstants.PHONE_REGEX_VALIDATION;
  errorMessage = '';
  invalidLogin: boolean = false;
  isEnabled = false;
  rememberMe: boolean = false;
  display = 'none'
  verifyModalData = {}
  passwordType: string = 'password';
  passwordIcon: string = 'eye-outline';
  showPassword = false;
  https: any;
  selectedForm = 'phone';
  //Login statment for translate
  loginSuccessfullMessageFr = 'Connecté !';
  defaultErrorFr = "Erreur lors de l'aurthentification, si le problème persiste, contacter l'admin";

  loginForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.emailRegexp)]),
    password: new FormControl('', Validators.required)
  });

  loginFormPhone = this.fb.group({
    phone: new FormControl('', [Validators.required, Validators.pattern(this.phoneRegex)]),
    password: new FormControl('', Validators.required)
  });

  constructor(private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private translateService: TranslateService,
    private sharedService: SharedService,
    private errorHandlerService: ErrorHandlerService,
    private modalService: ModalService) { }

  initializeFormGroup() {
    this.loginForm.setValue({
      email: '',
      password: ''
    });
  }

  initializePhoneFormGroup() {
    this.loginFormPhone.setValue({
      phone: '',
      password: ''
    });
  }

  ngOnInit() {
    if (localStorage.getItem("email") && localStorage.getItem("password")) {
      this.loginForm.patchValue({
        email: localStorage.getItem("email"),
        password: localStorage.getItem("password")
      });
      if (localStorage.getItem("phone") && localStorage.getItem("password2")) {
        this.loginFormPhone.patchValue({
          phone: localStorage.getItem("phone"),
          password: localStorage.getItem("password2")
        });
      }
    }
  }

  sendLoggedInEvent() {
    this.sharedService.sendIsLoggedInEvent();
  }

  hideShowPassword() {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.passwordIcon = 'eye-outline';
    }
    else { this.passwordIcon = 'eye-off-outline'; }
  }

  onSubmit() {
    this.saveCredentials();
    let payload = { email: this.loginForm.value['email'], password: this.loginForm.value['password'] }
    this.authService.basicJwtAuthLogin(payload).subscribe(
      response => {
        this.toastService.showSuccessToast(this.loginSuccessfullMessageFr);
        this.invalidLogin = false;
        this.sendLoggedInEvent();
        this.router.navigate(['/pages/account']);
      },
      error => {
        this.errorMessage = this.errorHandlerService.getErrorFromStatus(error);
        this.toastService.showErrorToast(
          this.translateService.instant(this.errorMessage));
        this.invalidLogin = true;
      }
    )
  }

  onSubmitPhone() {
    this.saveCredentials();
    let inputPhone = this.loginFormPhone.value['phone']!;
    let code = AppConfigConstants.PHONE_CODE;
    let phone = '' + inputPhone;
    phone = code + phone.substring(1);
    let payload = { email: phone, password: this.loginFormPhone.value['password'] }
    this.authService.basicJwtAuthLogin(payload).subscribe(
      response => {
        this.toastService.showSuccessToast(this.loginSuccessfullMessageFr);
        this.invalidLogin = false;
        this.sendLoggedInEvent();
        this.router.navigate(['/pages/account']);
      },
      error => {
        this.errorMessage = this.errorHandlerService.getErrorFromStatus(error);
        this.toastService.showErrorToast(
          this.translateService.instant(this.errorMessage));
        this.invalidLogin = true;
      }
    )
  }

  toggleValue(event: any) {
    if (event.target.checked) {
      this.rememberMe = true;
    }
  }

  saveCredentials() {
    if (this.rememberMe) {
      localStorage.setItem("email", this.loginForm.value.email || '');
      localStorage.setItem("password", this.loginForm.value.password || '');
      localStorage.setItem("phone", this.loginFormPhone.value.phone || '');
      localStorage.setItem("password2", this.loginFormPhone.value.password || '');
    }
  }

  eventDisplay() {
    this.display = 'none';
  }

  segmentChanged(event: any) {
    this.selectedForm = event.detail.value;
    this.loginForm.markAsUntouched();
    this.loginFormPhone.markAsUntouched();
  }

  openForgotPassModal() {
    this.modalService.openResetPasswordModalWithEmail();
  }


  // getLoginPage(provider: string): string {
  //   let uri = '';
  //   if (provider === 'facebook') {
  //     uri = Constants.FACEBOOK_AUTH_URI;
  //   }
  //   else if  (provider === 'google'){
  //     uri = Constants.GOOGLE_AUTH_URI;
  //   }
  //   return uri;
  // }

}
