import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/htpp/authentication/auth.service';
import { ModalService } from 'src/app/services/modal-service/modal.service';
import { ToastService } from 'src/app/services/toast-service/toast.service';
import { ErrorHandlerService } from 'src/app/services/utils-service/error-handler.service';
import { ValidationFormService } from 'src/app/services/utils-service/validation-form.service';
import { AppConfigConstants } from 'src/app/shared/app-config-constants';
import { MessageInfo } from 'src/app/shared/info-message-constants';

@Component({
  selector: 'app-reset-password-with-email-modal',
  templateUrl: './reset-password-with-email-modal.page.html',
  styleUrls: ['./reset-password-with-email-modal.page.scss'],
})
export class ResetPasswordWithEmailModalPage implements OnInit {

  emailRegex = AppConfigConstants.EMAIL_REGEX_VALIDATION;
  phoneRegex = AppConfigConstants.PHONE_REGEX_VALIDATION;
  errorMessage = '';
  selectedForm = 'phone';
  resetPasswordEmailForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.emailRegex)])
  }
  );

  resetPasswordPhoneForm = this.fb.group({
    phone: new FormControl(null, [Validators.required, Validators.pattern(this.phoneRegex)])
  }
  );

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private translateService: TranslateService,
    private errorHandlerService: ErrorHandlerService,
    private validationFormService: ValidationFormService,
    private modalCtrl: ModalController,
    private modalService: ModalService,
    private router: Router) { }

  initializeFormGroup() {
    this.resetPasswordEmailForm.setValue({
      email: ''
    });
  }

  initializePhoneFormGroup() {
    this.resetPasswordPhoneForm.setValue({
      phone: null
    });
  }

  ngOnInit() {

  }

  onSubmit() {
    let email = this.resetPasswordEmailForm.value['email']!;
    this.authService.getOtp(email).subscribe(
      response => {
        this.modalService.openModalInfo(this.translateService.instant("COMMON.otpSendByEmailForRestPassword"), 'for-otp', email);
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

  onSubmitPhone(){
    let inputPhone = this.resetPasswordPhoneForm.value['phone']!;
    let code = AppConfigConstants.PHONE_CODE;
    let phone = '' + inputPhone;
    phone = code + phone.substring(1);
    this.authService.getOtpPhone(phone).subscribe(
      response => {
        this.modalService.openModalInfo(this.translateService.instant("COMMON.otpSendBySMSForRestPassword"), 'for-otp', phone);
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

  segmentChanged(event: any){
    this.selectedForm = event.detail.value;
    this.initializePhoneFormGroup();
    this.initializeFormGroup();
    this.resetPasswordEmailForm.markAsUntouched();
    this.resetPasswordPhoneForm.markAsUntouched();
  }
  onCancel() {
    this.modalCtrl.dismiss();
  }

}
