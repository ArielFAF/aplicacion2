import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from "@angular/forms";

import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { RouterModule, Routes } from '@angular/router';

//firebase 
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';

//componets
import { ProductsComponent } from './components/products/products.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductComponent } from './components/products/product/product.component'; 
import { CalculadoraComponent } from './components/ipf/calculadora/calculadora.component';
import { PrestamoComponent } from './components/prestamo/prestamo.component';
import { VueltaComponent } from './components/vuelta/vuelta.component';
import { LoginComponent } from './components/login/login.component';

//services
import { ProductService } from './services/product.service';
import { SpreadsheetDS } from './services/spreadsheet-data.service';
import { LoginService } from './services/login.service';

const appRoutes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'calculadora', component: CalculadoraComponent },
  { path: 'prestamo', component: PrestamoComponent },
  { path: 'vuelta', component: VueltaComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductListComponent,
    ProductComponent,
    CalculadoraComponent,
    PrestamoComponent,
    VueltaComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [
    ProductService,
    SpreadsheetDS,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
