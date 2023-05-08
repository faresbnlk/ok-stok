import { LoaderInterceptorService } from './loader-interceptor.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { AuthService } from "./authentication/auth.service";
import { SharedService } from '../utils-service/shared.service';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  private totalRequests = 0;
  public isBackendAlive = true;

  constructor(private authService: AuthService,
              private loaderInterceptorService: LoaderInterceptorService,
              public sharedService: SharedService
             ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAuthToken();
    request = request.clone({
      setHeaders: {
        'Access-Control-Allow-Origin': '*'
      }
    });
    if (token) {
      // If we have a token, we set it to the header
      request = request.clone({
        setHeaders: { Authorization: `${token}` }
      });
    }
    next.handle(request).subscribe(response => {
    },
    error => {
      this.sharedService.getIsBackendAlive();
    })

    this.totalRequests++;
    this.loaderInterceptorService.setLoading(true);

    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests == 0) {
          this.loaderInterceptorService.setLoading(false);
        }
      })
    );
  }
}

