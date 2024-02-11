import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Validation } from 'src/app/models/validation';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm:FormGroup;
  submitted: boolean = false;
  StrongPasswordRegx: RegExp =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

  formValue:any

  constructor(private fb:FormBuilder,private router: Router, private toast:ToastrService ,private authService: AuthenticationService) { }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
           firstName: ['', [Validators.required,Validators.minLength(6)]],
           phoneNumber: ['', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
           mail: ['', [Validators.required,Validators.email]],
           password: ['', [Validators.required, Validators.pattern(this.StrongPasswordRegx)]],
           cmPassword: ['', Validators.required],
       },
       { validators: [Validation.match('password', 'cmPassword')]}
) }


onSubmit(){
  console.log( typeof this.registerForm , "register")
  this.submitted = true;
  // if(this.registerForm.invalid){
  //   return;
  // }
 this.formValue={
  "name": this.f['firstName'].value,
  "mail":  this.f['mail'].value,
  "phoneNumber":  this.f['phoneNumber'].value,
  "password":  this.f['password'].value
  
 }

  if(this.registerForm.valid){
     console.log(JSON.stringify(this.registerForm.value,null,2), "registerrrrr")
    console.log(this.formValue,"register form value")
    this.authService.adminRegister(this.formValue).subscribe(
      (response: any) => {
        console.log(response.message, "posted Data");
        // Handle the response as plain text
        this.toast.success(response.message);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error("Error occurred:", error);
        this.toast.error(error.error);
      })
     
    

    
  }

 }

 resetForm() {
  console.log("reset")
  this.registerForm.reset();
}

 get f() 
{ return this.registerForm.controls; }

}



//this.router.navigate(['/fruits/login'])