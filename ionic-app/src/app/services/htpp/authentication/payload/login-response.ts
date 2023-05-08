export class LoginResponse {
  private _email!: string;
  private _token!: string;
  private _roles!: string[];


  constructor(_email: string, _token: string, _roles: string[]){}

  get email(){
    return this._email;
  }

  set email(value: string){
    this._email = value;
  }

  get token(){
    return this._token;
  }

  set token(value: string){
    this._token = value;
  }

  get roles(){
    return this._roles;
  }

  set roles(value: string[]){
    this._roles = value;
  }

  rolesToString(): string{
    return this.roles.toString();
  }

}
