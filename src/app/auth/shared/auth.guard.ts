import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Injectable()
export class AuthGuard implements CanActivate{

    private url:string;
    constructor(private auth:AuthService, private router:Router){}

    private handleAuthState():boolean{
        if(this.isLoginOrRegisterPage()){
            this.router.navigate(['/rentals']);
            return false;
        }

        return true;
    }
    private handleNotAuthState():boolean{
        if(this.isLoginOrRegisterPage())
            return true;

        this.router.navigate(['/login']);
        return false;
    }
    private isLoginOrRegisterPage():boolean{
        if(this.url.includes('login') || this.url.includes('register'))
            return true;
        
        return false;
    }

    canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        this.url = state.url;
        if(this.auth.isAuthenticated()){
            return this.handleAuthState();
        }
        return this.handleNotAuthState();
    }
}