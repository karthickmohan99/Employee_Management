import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/service/employee.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
      
  editForm: FormGroup;
  employee: Employee;
  id: number;

  constructor(
    private service: EmployeeService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    
    this.service.getEmployeeById(this.id).subscribe(data => {
      console.log(data, "updateGet");
      this.employee = data;
      this.populateForm(); // Populate form once the employee data is fetched
    });
  }

  populateForm() {
    this.editForm = this.fb.group({
      empName: ["", Validators.required],
      empMail: ["", [Validators.required, Validators.email]],
      empDepartment: ["", [Validators.required,]],
      empDesignation: ["", Validators.required],
      empPhoneNumber: ["", Validators.required]
  
    });
  }

  get f() {
    return this.editForm.controls;
  }

  onUpdate() {
    this.service.updateEmployee(this.editForm.value, this.id).subscribe(
      data => {
        console.log(data, "updated");
        this.toast.success("Employee Updated Successfully");
        this.router.navigate(['/home']);
      },
      err => {
        console.log(err, "update error");
      }
    );
  }
}
