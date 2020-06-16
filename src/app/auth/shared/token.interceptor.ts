import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from '../shared/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
    constructor(private auth: AuthService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const token = this.auth.getAuthToken();
        if(token){
            request = request.clone({
                setHeaders:{
                    Authorization: 'Bearer ' + token
                }
            });
        }
        return next.handle(request);
    }
}