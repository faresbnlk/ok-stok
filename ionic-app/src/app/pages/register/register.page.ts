import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/htpp/authentication/auth.service';
import { ModalService } from 'src/app/services/modal-service/modal.service';
import { ToastService } from 'src/app/services/toast-service/toast.service';
import { ErrorHandlerService } from 'src/app/services/utils-service/error-handler.service';
import { ValidationFormService } from 'src/app/services/utils-service/validation-form.service';
import { AppConfigConstants } from 'src/app/shared/app-config-constants';
import { MessageInfo } from 'src/app/shared/info-message-constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  emailRegexp = AppConfigConstants.EMAIL_REGEX_VALIDATION;
  phoneRegex = AppConfigConstants.PHONE_REGEX_VALIDATION;
  errorMessage: string = '';
  rememberMe: boolean = false;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-outline';
  showPassword = false;
  selectedProfil = '';
  profils: string[] = ['wholesale','retail'];
  wholesaleChecked = false;
  wholesale = false;
  selectedForm = 'phone';

  registerForm = this.fb.group(
    {
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.emailRegexp)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      rePassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      profil: new FormControl('', Validators.required)
    },
    {
      validator: this.validationFormService.passwordMatchValidator
    }
  );

  registerPhoneForm = this.fb.group(
    {
      phone: new FormControl(null, [Validators.required, Validators.pattern(this.phoneRegex)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      rePassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      profil: new FormControl('', Validators.required)
    },
    {
      validator: this.validationFormService.passwordMatchValidator
    }
  );

  constructor(private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private translateService :TranslateService,
    private validationFormService: ValidationFormService,
    private modalService: ModalService,
    private errorHandlerService: ErrorHandlerService,) { }

  ngOnInit() {
  }

  segmentChanged(event: any){
    this.selectedForm = event.detail.value;
    this.initializePhoneFormGroup();
    this.initializeFormGroup();
    this.registerForm.markAsUntouched();
    this.registerPhoneForm.markAsUntouched();
  }

  initializeFormGroup() {
    this.registerForm.setValue({
      email: '',
      password: '',
      rePassword: '',
      profil: ''
    });
  }

  initializePhoneFormGroup() {
    this.registerPhoneForm.setValue({
      phone: null,
      password: '',
      rePassword: '',
      profil: ''
    });
  }

  onSubmit() {
    let user = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      role: this.selectedProfil === 'wholesale' ? 'SELLER' : 'USER'
    }
    this.authService.userSignup(user).subscribe(
      response => {
        let successRegisterMessage = this.translateService.instant(MessageInfo.ACCOUNT_CREATED);
        let emailVerifSent = this.translateService.instant(MessageInfo.EMAIL_VERIFICATION_SENT);

        this.modalService.openModalInfoWithRedirection(successRegisterMessage + ' ! ' + emailVerifSent, '/pages/login');
      },
      error => {
        this.errorMessage = this.errorHandlerService.getErrorFromStatus(error);
        this.toastService.showErrorToast(
          this.translateService.instant(this.errorMessage));
      }
    )
  }

  onSubmitPhone() {
    let inputPhone = this.registerPhoneForm.value['phone']!;
    let code = AppConfigConstants.PHONE_CODE;
    let phone = '' + inputPhone;
    phone = code + phone.substring(1);
    let user = {
      phone: phone,
      password: this.registerPhoneForm.value.password,
      role: this.selectedProfil === 'wholesale' ? 'SELLER' : 'USER'
    }
    this.authService.userSignupPhone(user).subscribe(
      response => {
        let successRegisterMessage = this.translateService.instant(MessageInfo.ACCOUNT_CREATED);
        let emailVerifSent = this.translateService.instant(MessageInfo.EMAIL_VERIFICATION_SENT);

        this.modalService.openModalInfoWithRedirection(successRegisterMessage + ' ! ' + emailVerifSent, '/pages/login');
      },
      error => {
        console.log(error);
        this.errorMessage = this.errorHandlerService.getErrorFromStatus(error);
        this.toastService.showErrorToast(
          this.translateService.instant(this.errorMessage));
      }
    )
  }

  hideShowPassword() {
    this.showPassword = !this.showPassword;
    if (this.showPassword){
      this.passwordIcon = 'eye-outline';
    }
    else {this.passwordIcon = 'eye-off-outline';}
  }

}
