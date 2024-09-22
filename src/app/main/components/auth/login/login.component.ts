import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginRequestModel } from 'src/app/main/models/login-request.model';
import { AuthService } from 'src/app/main/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  model: LoginRequestModel;

  valCheck: string[] = ['remember'];

  constructor(

    private cookieService: CookieService,
    private authService: AuthService,
    private router: Router
  ) {
    this.model = {
      email: '',
      password: ''
    }
  }

  onFormSubmit(): void {
    console.log(this.model);
    this.authService.login(this.model).subscribe({
      next: (response) => {
        //set auth cookie
        this.cookieService.set('Authorization', `Bearer ${response.token}`,
          undefined, '/', undefined, true, 'Strict'
        );

        //Set User
        this.authService.setUser({
          email: response.email,
          roles: response.roles
        });

        //Redirect back to home
        this.router.navigateByUrl('/');
      },
    })
  }
}
