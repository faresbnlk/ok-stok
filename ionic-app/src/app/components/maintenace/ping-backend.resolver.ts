import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { SharedService } from "src/app/services/utils-service/shared.service";

@Injectable()
export class PingBackendResolver implements Resolve<any> {

  constructor(private router: Router,
              private sharedService: SharedService) {}

  resolve(route: ActivatedRouteSnapshot): any{

    return this.sharedService.getIsBackendAlive();
  }
}
