import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = `${environment.apiUrl}/api/employee`;

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<any> {
    return this.http.get(`${this.apiUrl}/listEmployees`);
  }

  addEmployee(employeeData: Employee): Observable<any> {
    return this.http.post(`${this.apiUrl}/addEmployee`, employeeData);
  }

  deleteEmployee(id: Number | undefined): Observable<Employee> {
    return this.http.delete(`${this.apiUrl}/deleteEmployee/${id}`);
  }

  updateEmployee(updatedData: Employee, id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedData);
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/listById/${id}`);
  }
}
