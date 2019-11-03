import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {

  c1: number;
  c2: number;
  c3: number;
  c4: number;

  parametros: any = {
    genero: 'Masculino',
    pesoCorporal: 82.4,
    modalidad: 'RAW',
    tipo: 'Bench Press',
    pesoTotal: 160
  }

  puntosIPF = 0;

  generos: any[] = [{ text: 'Masculino', valor: 'Masculino' }, { text: 'Femenino', valor: 'Femenino' }];
  modalidades: any[] = [{ text: 'RAW', valor: 'RAW' }, { text: 'POWER', valor: 'POWER' }];
  tipos: any[] = [{ text: 'Potencia', valor: 'Potencia' }, { text: 'Bench Press', valor: 'Bench Press' }];

  constructor() { }

  ngOnInit() {
    this.limpiar();
  }

  Coeficiente2019() {
    // Se utiliza la formula IPF 2019 -> https://www.powerlifting.sport/fileadmin/ipf/data/ipf-formula/IPF-Formula-2019.pdf
    // https://www.powerlifting.sport/rulescodesinfo/ipf-formula.html

    // console.log(this.parametros);
    if (this.parametros.genero === '' ||
      this.parametros.pesoCorporal === 0 ||
      this.parametros.modalidad === '' ||
      this.parametros.pesoTotal === 0 ||
      this.parametros.tipo === '') {
      this.puntosIPF = 0;
      return;
    }

    // raw -> classic       power -> equipped
    // Potencia -> 3-Lift   Bench Press -> Bench

    if (this.parametros.genero === 'Masculino') {
      if (this.parametros.modalidad === 'RAW') { // Classic
        if (this.parametros.tipo === 'Potencia') { // 3-Lift
          //  Men Classic 3-Lift 310,6700 857,7850 53,2160 147,0835
          this.c1 = 310.67;
          this.c2 = 857.785;
          this.c3 = 53.216;
          this.c4 = 147.0835;
        } else { // Bench
          //  Men Classic Bench 86,4745 259,1550 17,5785 53,1220
          this.c1 = 86.4745;
          this.c2 = 259.155;
          this.c3 = 17.5785;
          this.c4 = 53.122;
        }
      } else { // Equipped
        if (this.parametros.tipo === 'Potencia') { // 3-Lift
          //  Men Equipped 3-Lift 387,2650 1121,2800 80,6324 222,4896
          this.c1 = 387.265;
          this.c2 = 1121.28;
          this.c3 = 80.6324;
          this.c4 = 222.4896;
        } else { // Bench
          //  Men Equipped Bench 133,9400 441,4650 35,3938 113,0057
          this.c1 = 133.94;
          this.c2 = 441.465;
          this.c3 = 35.3938;
          this.c4 = 113.0057;
        }
      }
    } else { // Femenino
      if (this.parametros.modalidad === 'RAW') { // Classic
        if (this.parametros.tipo === 'Potencia') { // 3-Lift
          // Women Classic 3-Lift 125,1435 228,0300 34,5246 86,8301
          this.c1 = 125.1435;
          this.c2 = 228.03;
          this.c3 = 34.5246;
          this.c4 = 86.8301;
        } else { // Bench
          //  Women Classic Bench 25,0485 43,8480 6,7172 13,9520
          this.c1 = 25.0485;
          this.c2 = 43.848;
          this.c3 = 6.7172;
          this.c4 = 13.952;
        }
      } else { // Equipped
        if (this.parametros.tipo === 'Potencia') { // 3-Lift
          //  Women Equipped 3-Lift 176,5800 373,3150 48,4534 110,0103
          this.c1 = 176.58;
          this.c2 = 373.315;
          this.c3 = 48.4534;
          this.c4 = 110.0103;
        } else { // Bench
          //  Women Equipped Bench 49,1060 124,2090 23,1990 67,4926
          this.c1 = 49.106;
          this.c2 = 124.209;
          this.c3 = 23.199;
          this.c4 = 67.4926;
        }
      }
    }

    const temp = 500 + 100 * (this.parametros.pesoTotal - (this.c1 * Math.log(this.parametros.pesoCorporal) - this.c2)) / (this.c3 * Math.log(this.parametros.pesoCorporal) - this.c4);

    this.puntosIPF = parseFloat(temp.toFixed(4));
    // return parseFloat(temp.toFixed(4)); // Round(temp, 4)
  }

  limpiar() {
    this.parametros.genero = '';
    this.parametros.pesoCorporal = 0;
    this.parametros.pesoTotal = 0;
    this.parametros.modalidad = '';
    this.parametros.tipo = '';
  }

}
