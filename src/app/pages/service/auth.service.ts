import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://localhost:7190/api/Auth';

  constructor(private http: HttpClient) {}
  register(model: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Register`, model);
  }
  login(model: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Login`, model);
  }
}
