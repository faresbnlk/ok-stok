import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationFormService {

  constructor() { }

  passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password')?.value; // get password from our password form control
    const confirmPassword: string = control.get('rePassword')?.value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('rePassword')?.setErrors({ NoPasswordMatch: true });
    }
  }
}
