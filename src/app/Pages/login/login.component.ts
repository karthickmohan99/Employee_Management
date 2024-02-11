import { Component,OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit {

  loginForm : FormGroup
  submitted: any=false;
  registerbtn: any;
  StrongPasswordRegx: RegExp =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

  constructor(private fb:FormBuilder,private router: Router,private toast: ToastrService ,private authService :AuthenticationService) { }
  ngOnInit(): void {
    this.loginForm=this.fb.group({
      mail:['',[Validators.required,Validators.email]],
      password :['',[Validators.required, Validators.pattern(this.StrongPasswordRegx)]],})
     
  
    }

    onSubmit(){
      this.submitted = true;
      console.log(JSON.stringify(this.loginForm.value,null,2), "loginnn")

      if(this.loginForm.valid){
            this.authService.adminLogin(this.loginForm.value).subscribe((response)=>{
              console.log("login response",response)
              this.toast.success(response.message);
              this.router.navigate(['/home']);
            },(error)=>{
              console.log(error.error,"error")
              this.toast.error(error.error);
              this.registerbtn = true;
            })
      }
    }


    
    get f()
    { 
      return this.loginForm.controls;
    };
  
  
}
