import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tiempo',
  templateUrl: './tiempo.component.html',
  styleUrls: ['./tiempo.component.css']
})
export class TiempoComponent implements OnInit {

  constructor(public http: HttpClient) {  }

  ngOnInit() {
    //   this.http.get('https://ssl.smn.gob.ar/dpd/descarga_opendata.php?file=observaciones/tiepre20191231.txt')
    //   .subscribe(data => {
    //     console.log(data);
    // });

    // http://www3.smn.gov.ar/dpd/descarga_opendata.php?file=observaciones/tiepre20191231.txt

    // this.http.get('/dpd/descarga_opendata.php?file=observaciones/tiepre20191231.txt')
    //   .subscribe(data => {
    //     console.log(data);
    //   },
    //     err => {
    //       console.log(err);
    //     });


  }

}
