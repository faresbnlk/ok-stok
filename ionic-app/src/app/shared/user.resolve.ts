import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/htpp/authentication/auth.service";
import { IUser } from "./models/user.interface";

@Injectable()
export class UserResolve implements Resolve<IUser> {
  constructor(private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUser> {
  }
}
