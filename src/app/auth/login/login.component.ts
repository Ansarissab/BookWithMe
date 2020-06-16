import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'bwm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup ;
  loginFormerrors:any[]=[];
  notifyMessage:string = '';
  constructor(private fb:FormBuilder, private auth:AuthService , private router:Router , private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe(
      (params)=>{
      if(params['registered'] === 'success'){
        this.notifyMessage= "You have registered successfully, Now you can login!";
      }
    });
  }
  initForm(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required , Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password: ['', Validators.required]
  });
  }
  isvalidInput(field:string) : boolean{
    return this.loginForm.controls[field].invalid && ( this.loginForm.controls[field].dirty || this.loginForm.controls[field].touched );

  }
  isrequiredInput(field:string) : boolean{
    return this.loginForm.controls[field].errors.required;
  }
  isValidEmailFormat(field:string):boolean{
    return this.loginForm.controls[field].errors.pattern;
  }

  login(){
    this.auth.login(this.loginForm.value).subscribe(
      (token) => {
        this.router.navigate(['/rentals']);
      },
      (errorResponse) => {
          this.loginFormerrors = errorResponse.error;
      });
  }

}
