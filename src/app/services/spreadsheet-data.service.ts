import { Injectable, EventEmitter } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { SpreadsheetIDs } from './spreadsheetIDs';

@Injectable({
  providedIn: 'root'
})
export class SpreadsheetDS {

  ssIDs: SpreadsheetIDs = new SpreadsheetIDs;
  lastUpdated = new Date();
  refreshHowOften = (36e5 * 6); // 6 hours

  gerardo$: Observable<Array<any>>;

  gerardoLabel = 'Gerardo';

  gerardoUpdated = new EventEmitter<Array<any>>();

  constructor(public http: HttpClient) {

    // initial loads
    this.loadGerardo('Gerardo');
  }

  public static setLocal(whatData: any, cacheName: string) {
    // writes data to local storage
    localStorage[cacheName] = JSON.stringify(whatData);
  }

  refreshStaleData() {
    this.refreshAll();
  }

  // google sheets
  getHTTPData_SS(whatTab: string): Observable<Array<any>> {
    // console.log('Getting data from the ' + whatTab + ' spreadsheet tab');
    return this.http.get<any>(this.ssIDs.getTabURL(whatTab))
      .pipe(map(obj => obj.feed.entry));
  }

  getHTTPData_Tabs(): Observable<Array<any>> {
    // console.log('Getting all tabs in the spreadsheet');
    return this.http.get<any>(this.ssIDs.getAllTabsURL())
      .pipe(map(obj => obj.feed.entry));
  }

  refreshAll() {
    this.loadGerardo('Gerardo');
    this.lastUpdated = new Date();
  }

  loadGerardo(objName: string) {

    let animalCount = 0;
    let gerardo: Array<any> = [];
    this.gerardo$ = this.getHTTPData_SS(objName);
    this.gerardo$.subscribe(next => {

      if (next != null) {
        // transform the JSON returned to make it more usable
        gerardo = this.transformGerardo(next);
        animalCount = gerardo.length;
      }
      SpreadsheetDS.setLocal(gerardo, this.ssIDs.getCacheName(objName));
      this.gerardoLabel = this.buildLabel(animalCount, objName);
      this.gerardoUpdated.emit(gerardo);

    });

  }

  transformGerardo(dataReceived: Array<any>): Array<any> {

    const tempArray: Array<any> = [];
    for (const i of dataReceived) {

      tempArray.push({
        Numero: i.gsx$nro.$t,
        Fecha: i.gsx$fecha.$t,
        Importe: i.gsx$importe.$t
      });
    }
    return tempArray;
  }


  buildLabel(animalCount: number, objName: string) {

    let label = '';
    const animalName = this.ssIDs.getLabelName(objName);

    switch (animalCount) {
      case 0: {
        label = 'No ' + animalName + 's';
        break;
      }
      case 1: {
        label = '1 ' + animalName;
        break;
      }
      default: {
        label = animalCount + ' ' + animalName + 's';
        break;
      }
    }

    return label;
  }
}
