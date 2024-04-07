import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Register } from '../../models/register.interface';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

userReg! : Register;
constructor (private authsrv: AuthService){}

onsubmit(form:NgForm){
console.log(form.value);
try {
  this.authsrv.signup(form.value).subscribe
}catch(error){
  console.error(error);
}


}


}
