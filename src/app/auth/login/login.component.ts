import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UvIfDirective } from '../../shared/uv-if.directive';
import { UvClassDirective } from '../../shared/uv-class.directive';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, NgIf, UvClassDirective, UvIfDirective]
})
export class LoginComponent implements OnInit{
  private authService = inject (AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  formulario!: FormGroup;
  hide = true;
  visible = false;
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
