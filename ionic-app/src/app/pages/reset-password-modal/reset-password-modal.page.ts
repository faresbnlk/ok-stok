import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/htpp/authentication/auth.service';
import { ToastService } from 'src/app/services/toast-service/toast.service';
import { ErrorHandlerService } from 'src/app/services/utils-service/error-handler.service';
import { ValidationFormService } from 'src/app/services/utils-service/validation-form.service';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal-service/modal.service';

@Component({
  selector: 'app-reset-password-modal',
  templateUrl: './reset-password-modal.page.html',
  styleUrls: ['./reset-password-modal.page.scss'],
})
export class ResetPasswordModalPage implements OnInit {

  passwordType: string = 'password';
  passwordIcon: string = 'eye-outline';
  showPassword = false;
  email = '';
  contact = '';
  errorMessage = '';

  resetPasswordForm = this.fb.group({
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  },
    {validator: this.validationFormService.passwordMatchValidator}
  );

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private translateService :TranslateService,
    private errorHandlerService: ErrorHandlerService,
    private validationFormService: ValidationFormService,
    private modalCtrl : ModalController,
    private modalService: ModalService,
    private router: Router) { }

  initializeFormGroup() {
    this.resetPasswordForm.setValue({
      password: '',
      rePassword: ''
    });
  }

  getResetPasswordContact(contact: string): string {
    let result = /^\d+$/.test(contact.substring(1));
    if (result){
      return 'reset-password-phone';
    }
    else {return 'reset-password'};
  }

  ngOnInit() {
  }

  onSubmit(){
    let body = {
      email: this.email,
      password: this.resetPasswordForm.value['password']!
    }
    this.authService.resetPassword(body, this.getResetPasswordContact(this.email)).subscribe(
      response => {
        this.modalService.openModalInfoWithRedirection(this.translateService.instant("COMMON.passwordHasBeenReset"), '/pages/login');
        this.initializeFormGroup();
        this.onCancel();
      },
      error => {
        this.errorMessage = this.errorHandlerService.getErrorFromStatus(error);
        this.toastService.showErrorToast(
          this.translateService.instant(this.errorMessage));
        this.initializeFormGroup();
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

  onCancel(){
    this.router.navigateByUrl('/pages/login');
    this.modalCtrl.dismiss();
  }
}
