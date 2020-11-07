import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  personas: any[] = [{ text: 'Elena', valor: 'Elena' }, { text: 'Gerardo', valor: 'Gerardo' }];

  parametros: any = {
    persona: ''
  };

  logueado: boolean = false;

  constructor(private router: Router, public loginService: LoginService) { }

  ngOnInit() {
    this.parametros.persona = localStorage.getItem('personaLogueada');

    if(this.parametros.persona) {
      this.loginService.personaLogueada = this.parametros.persona;
      this.logueado = true;
      this.ir(this.parametros.persona);
    }
  }

  ingresar() {
    localStorage.setItem('personaLogueada', this.parametros.persona);
    this.loginService.personaLogueada = this.parametros.persona;
    this.ir(this.parametros.persona);
  }

  ir(persona) {
    switch(persona){
      case 'Elena':
        this.router.navigateByUrl('/resumen');
        break;
      case 'Gerardo':
        this.router.navigateByUrl('/calculadora');
        break;
      default:
        break;
    }
  }

}
