import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  personaLogueada: string = '';

  constructor() { 
    this.personaLogueada = localStorage.getItem('personaLogueada');
  }
}
