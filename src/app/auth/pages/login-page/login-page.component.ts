import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {
  constructor(
    private authService:AuthService,
    private router: Router
  ) { }

  public authForm = new FormGroup({
    email: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true })
  })

  onSubmit():void{
    if(this.authForm.invalid) return;
    const {email, password} = this.authForm.value;
    this.authService.login(email!,password!).subscribe(() =>{
      this.router.navigateByUrl('/');
    })
  }
}
