import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {AuthService} from "./auth.service";
import 'rxjs/add/operator/do';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const requestClone = request.clone({
      setHeaders: {
        'Authorization' : `${ this.authService.getToken() }`
        // 'Authorization' : `Bearer ${ this.authService.getToken() }`
        // 'Content-Type' : 'application/x-www-form-urlencoded'
      }
    });

    return next.handle(requestClone)
      .do((event: HttpEvent<any>) => {
        if(event instanceof HttpResponse){
          let token: string;
          const auth = event.headers.getAll("Authorization");
          if(auth != null){
            if(auth.length > 1)
              token = auth[1];
            else if(auth.length === 1)
              token = auth[0];
            else
              token = null;

            localStorage.setItem('token', token);
          }
        }
      });
  }
}
