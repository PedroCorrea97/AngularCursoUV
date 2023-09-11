import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  private authService = inject (AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  formulario!: FormGroup;
  hide = true;
  controlForm = (propiedad: string) => this.formulario.controls[propiedad];
  
  ngOnInit() { this.formulario = this.fb.group({ username: ['', [Validators.minLength(4), Validators.maxLength(20)]], password: ['', [Validators.minLength(4), Validators.maxLength(20)]] }) }

  get username(){ return this.controlForm('username') }

  get password(){ return this.controlForm('password') }

  login(){
    const userNameValue = this.username.value
    const passwordValue = this.password.value
    console.log(this.username.value, this.password.value);
    this.authService.login(userNameValue, passwordValue).subscribe( { next: (resp) => { this.router.navigateByUrl('/admin'); }, error:(error) => { console.error(error); console.log(error); }})
   }

}
