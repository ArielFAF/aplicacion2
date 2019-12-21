import { Component, OnInit, ViewChild } from '@angular/core';

import { Prestamo } from '../../models/prestamo';
import { SpreadsheetDS } from '../../services/spreadsheet-data.service';

@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.css']
})
export class PrestamoComponent implements OnInit {

  cuotas: any [];
  
  objName = 'Gerardo';
  
  // the column order
  displayedColumns: string[] = ['Nro', 'Fecha', 'Importe'];

  constructor(public sds: SpreadsheetDS) {

    this.sds.gerardoUpdated.subscribe(
      (newData: any) => {
        // console.log(newData);
        this.cuotas = newData;
      }
    );
  }

  ngOnInit() {
    this.sds.gerardoUpdated.emit(
      // use the local storage if there until HTTP call retrieves something
      JSON.parse(localStorage[this.sds.ssIDs.getCacheName(this.objName)] || '[]')
    );
  }

  refreshDogs() {
    this.sds.loadGerardo(this.objName);
  }

  applyFilter(filterValue: string) {
  }

}
