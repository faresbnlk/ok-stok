import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/htpp/authentication/auth.service';
import { ModalService } from 'src/app/services/modal-service/modal.service';
import { ToastService } from 'src/app/services/toast-service/toast.service';
import { ErrorHandlerService } from 'src/app/services/utils-service/error-handler.service';
import { ValidationFormService } from 'src/app/services/utils-service/validation-form.service';

@Component({
  selector: 'app-account-validation-modal',
  templateUrl: './account-validation-modal.component.html',
  styleUrls: ['./account-validation-modal.component.scss'],
})
export class AccountValidationModalComponent implements OnInit {

  @ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;

  otp: string = '';

  errorMessage = '';

  otpIsValid = false;
  config = {
    length: 6,
    allowNumbersOnly: true,
    inputStyles: {
      'width': '1.7rem',
      'height': '1.7rem'
    }
  }

  email = '';

  validateOtpForm = this.fb.group({
    otp: new FormControl(null, [Validators.required, Validators.maxLength(6), Validators.maxLength(6), Validators.pattern("^[0-9]{6,6}$")])
  }
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
    this.validateOtpForm.setValue({
      otp: null,
    });
    this.clear();
  }

  onOtpChange(otp: string) {
    this.otp = otp;
    if (this.otp.length === 6){
      this.otpIsValid = true;
    }
  }

  setVal(val: any) {
    this.ngOtpInput.setValue(val);
  }

  clear(){
    this.ngOtpInput.setValue(null);
  }

  generateOtp(){
    this.authService.getOtp(this.email).subscribe(
      response => {
        this.toastService.showInfoToast(
          this.translateService.instant("COMMON.otpSendByEmailForRestPassword"));
      },
      error => {
        this.errorMessage = this.errorHandlerService.getErrorFromStatus(error);
        this.toastService.showErrorToast(
          this.translateService.instant(this.errorMessage));
        this.initializeFormGroup();
      }
    )
  }

  ngOnInit() {
  }

  onSubmit(){
    let body = {
      email: this.email,
      otpNo: this.otp
    }
    this.authService.submitOtp(body).subscribe(
      response => {
        this.toastService.showSuccessToast(
          this.translateService.instant("COMMON.otpValidated"));
        this.modalService.openResetPasswordModal(this.email);
        this.initializeFormGroup();
        this.onCancel();
      },
      error => {
        this.initializeFormGroup();
        this.errorMessage = this.errorHandlerService.getErrorFromStatus(error);
        this.toastService.showErrorToast(
          this.translateService.instant(this.errorMessage));
        this.initializeFormGroup();
      }
    )
  }

  onCancel(){
    this.router.navigateByUrl('/pages/login');
  this.modalCtrl.dismiss();
}


}
