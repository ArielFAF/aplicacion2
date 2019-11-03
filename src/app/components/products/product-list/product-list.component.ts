import { Component, OnInit } from '@angular/core';

// Services
import { ProductService } from "../../../services/product.service";
// import { ToastrService } from "ngx-toastr";

// Class Product
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: Product[];

  constructor(private prdoductService: ProductService
    // private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.prdoductService.getProducts()
    .snapshotChanges()
    .subscribe(item => {
      this.productList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        this.productList.push(x as Product);
      });
    });
  }

  onEdit(product: Product) {
    this.prdoductService.selectedProduct = Object.assign({},product);
  }

  onDelete($key: string) {
    // if(confirm('Esta seguro de eliminar?')){
      this.prdoductService.deleteProduct($key);
      // this.toastr.success('Eliminacion','Se elimino correctamente');
    // }
  }

}
