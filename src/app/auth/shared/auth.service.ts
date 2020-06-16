import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from "jwt-decode";
import * as moment from 'moment';
import { map } from 'rxjs/operators';


class DecodedToken{
    expire:number=0;
    username:string = '';
}

@Injectable()
export class AuthService{
    
    private decodedToken;
    constructor(private http: HttpClient){
        this.decodedToken = JSON.parse(localStorage.getItem('bwm_UserLogin_token_meta')) || new DecodedToken();
    }

    private saveToken(token:string):string{
        this.decodedToken = jwt_decode(token);
        localStorage.setItem('bwm_UserLogin_token',token);
        localStorage.setItem('bwm_UserLogin_token_meta',JSON.stringify(this.decodedToken));
        return token;
    }
    public register(userData):Observable<any>{
        return this.http.post('/api/v1/users/register',userData);
    }
    public login(userData):Observable<any>{
        return this.http.post('/api/v1/users/auth', userData).pipe(map(
            (token:string)=>{
                return this.saveToken(token);
            })
        );
    }
    public logout(){
        localStorage.removeItem('bwm_UserLogin_token');
        localStorage.removeItem('bwm_UserLogin_token_meta');
        this.decodedToken = new DecodedToken();
        this.isAuthenticated();
    }
    public isAuthenticated():boolean  {
        // console.log(moment().isBefore(moment.unix(this.decodedToken)));
        return moment().isBefore(moment.unix(this.decodedToken.exp));
    }
    public getAuthToken():string{
        return localStorage.getItem('bwm_UserLogin_token');
    }
    public getUserName():string{
        return this.decodedToken.username;
    }
}