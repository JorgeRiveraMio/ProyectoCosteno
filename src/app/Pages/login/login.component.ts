import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AccesoService } from '../../Services/acceso.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../Interfaces/Login';
import { error } from 'console';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
private accesoService =inject(AccesoService);
private router = inject(Router);
public formBuild=inject(FormBuilder);

public formLogin:FormGroup=this.formBuild.group({
  correo: ['',Validators.required],
  clave: ['',Validators.required]
})
iniciarSesion(){
  if(this.formLogin.invalid)return;

  const objeto:Login={
    username:this.formLogin.value.correo,
    password:this.formLogin.value.clave
  }
  this.accesoService.login(objeto).subscribe({
    next:(data)=>{
      if(data.isSuccess){
        localStorage.setItem("token",data.token)
        this.router.navigate(["principal"])
      }else{
        alert("Credenciales son incorrectas")
      }
    },
    error:(error)=>
    {
      console.log(error)
    }
  })
}
registrarse(){
  this.router.navigate(['registro']);
}
}
