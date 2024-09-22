import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { LoginRequestModel } from '../models/login-request.model';
import { LoginResponseModel } from '../models/login-response.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = "https://localhost:7157";

  $user = new BehaviorSubject<UserModel | undefined>(undefined);

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  login(request: LoginRequestModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(`${this.baseUrl}/api/auth/login`, {
      email: request.email,
      password: request.password
    });
  }

  //
  setUser(user: UserModel): void {
    this.$user.next(user);
    localStorage.setItem("user-email", user.email);
    localStorage.setItem("user-roles", user.roles.join(','));

  }

  user(): Observable<UserModel | undefined> {
    return this.$user.asObservable();
  }

  getUser(): UserModel | undefined {
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');

    if (email && roles) {
      const user: UserModel = {
        email: email,
        roles: roles.split(',')
      };

      return user;
    }

    return undefined;
  }

  logout(): void {
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.$user.next(undefined);
  }
}
