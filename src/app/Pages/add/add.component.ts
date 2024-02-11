import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/service/employee.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  addForm: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private service: EmployeeService ,private router: Router,private toast: ToastrService) { } // Update the service import as needed


  ngOnInit() {
    this.createForm();
  }
  

  createForm() {
    this.addForm = this.fb.group({
      empName: ["", Validators.required],
      empMail: ["", [Validators.required, Validators.email]],
      empDepartment: ["", [Validators.required,]],
      empDesignation: ["", Validators.required],
      empPhoneNumber: ["", [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    });
  }

   get f() {
    return this.addForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.addForm.value);
    console.log(JSON.stringify(this.addForm.value,null,2), "addddddd")
    this.service.addEmployee(this.addForm.value).subscribe(
      (data) => {
        console.log("Employee added", data);
        this.toast.success("Employee Added Successfully");
        this.router.navigate(['/home']);
      },
      (err) => {
        console.log("Error response", err);
      }
    );
  }
}
