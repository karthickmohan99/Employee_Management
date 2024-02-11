import { Component } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/service/employee.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  ngOnInit(): void {
    this.getEmployees();
}
 
Employees: Employee[];
constructor(private employeeService: EmployeeService,private toast: ToastrService ) {}

getEmployees() {
    this.employeeService.getEmployees().subscribe(data => {
        console.log(data, "Employees Data");
        this.Employees = data;
    });
}

onDelete(id: Number | undefined) {
    this.employeeService.deleteEmployee(id).subscribe(data => {
        console.log(data, "Employee Deleted");
        this.toast.success("Employee Deleted Successfully");
        this.getEmployees();
    }, err => {
        console.log(err, "Delete Error");
    });
}

}
