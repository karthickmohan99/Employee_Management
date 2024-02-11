import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = `${environment.apiUrl}/api/admin`;
  constructor(private http: HttpClient) { }

  adminRegister(admin: any): Observable<any> {
    console.log(admin, "-----auth service")
    const url = `${this.apiUrl}/register`;
    return this.http.post(url, admin);
  }


  adminLogin(admin: any): Observable<any> {
    console.log(admin, "-----auth service")
    const url = `${this.apiUrl}/login`;
    return this.http.post(url, admin);
  }
}
