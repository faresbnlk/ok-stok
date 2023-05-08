import { Error } from './../../shared/errors-constants';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }


  getErrorFromStatus(error: any): string{
    let message = error.error.message || error.message;
    let err = Error.DEFAULT_ERROR;
    Error.ERRORS.forEach(item => {
      if (error.status === item.code) {
        err = item.title
      }
    });
    if (error.status === 401){
      if(message.includes('Bad credentials')){
        err = Error.WRONG_PASSWORD;
      } else {err = Error.NOT_FOUND_EMAIL};
    }
    if (message.includes('verified') && message.includes('mail')){
      err = Error.NOT_VERIFIED_EMAIL;
    }

    if (message.includes('verified') && message.toLowerCase().includes('phone')){
      err = Error.PHONE_NOT_FOUND_OR_NOT_VERIFIED;
    }

    if (message.includes('mail already used')){
      err = Error.EMAIL_ALREADY_EXIST;
    }

    if (message.includes('phone number already used')){
      err = Error.PHONE_ALREADY_EXIST;
    }
    return err;
  }
}
