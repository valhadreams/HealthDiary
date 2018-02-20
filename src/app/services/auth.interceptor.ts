import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const requestClone = request.clone({
      setHeaders: {
        'Authorization' : `Bearer ${ this.authService.getToken() }`,
        'Content-Type' : 'application/x-www-form-urlencoded'
      }
    });

    return next.handle(requestClone);
  }
}
