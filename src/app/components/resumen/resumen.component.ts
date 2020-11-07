import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ResumenService } from 'src/app/services/resumen.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  constructor(private router: Router, public resumenService: ResumenService) { 
    // private location: Location, 
  }

  ngOnInit() {
    console.log(this.resumenService.resumen);
  }

  verResumen(tipo){
    console.log(this.resumenService.resumen);
    // window.location.href = 'https://firebasestorage.googleapis.com/v0/b/app-alaniz.appspot.com/o/resumenmama.pdf?alt=media&token=7fc68d28-db0a-439b-9d9e-75c0b972c842';
     // window.location.href = this.resumenService.resumen.resumenMama;

     if(tipo === 'Visa') {
      window.open(this.resumenService.resumen.resumenVisa, "_blank");
     } else {
      window.open(this.resumenService.resumen.resumenMaster, "_blank");
     }
     

  }
}
