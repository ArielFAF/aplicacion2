import { Injectable } from '@angular/core';
import { Resumen } from '../models/resumen';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ResumenService {
  resumenRecord: AngularFireList<any>;

  resumen: Resumen;

  constructor(private firebase: AngularFireDatabase) {
    // this.getConfig();
    this.resumenRecord = this.firebase.list('resumenes');
    
    this.firebase.list('resumenes')
    .snapshotChanges()
    .subscribe(item => {
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        this.resumen = x as Resumen;
      });
    });

   }

  getConfig() {
    this.resumenRecord = this.firebase.list('resumenes');
    
    this.firebase.list('resumenes')
    .snapshotChanges()
    .subscribe(item => {
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        this.resumen = x as Resumen;
      });
    });
  }
}

