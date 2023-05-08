export class LoginRequest {
  _email!: string;
  _password!: string;


  constructor(email: string, password: string){
    this._email = email;
    this._password = password;
  }

  get email(){
    return this._email;
  }

  set email(value: string){
    this._email = value;
  }

  get password(){
    return this._password;
  }

  set password(value: string){
    this.password = value;
  }

}
