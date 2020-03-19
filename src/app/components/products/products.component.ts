import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product';
import {ProductService} from '../../services/product.service';
import {Global} from '../../services/global';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {
  
  public products : Product[];
  public url: String;
  public value:String;
  pageActual: number =1;
  

  constructor(
    private _productService: ProductService
   
    
  ) {
    this.url=Global.url;
   }

  ngOnInit(): void {
    this.getProducts();
    
    
  }
  getProducts(){
    this._productService.getProducts().subscribe(
      response =>{
        console.log(response);
        if (response.products){
          this.products = response.products;
        }
      },
      error => {
        console.log(<any> error);
      }
    )
  }
  getValue(){
   console.log(this.value);
      this._productService.getProductsBrand(this.value).subscribe(
        response =>{
        if(response.products){
          this.products=response.products;
        }
      },
      error => {
        
      }
      )
  }
  getVal(valor: String)
  {

   console.log(valor);
   this._productService.getProductsBrand(valor).subscribe(
    response =>{
    if(response.products){
      this.products=response.products;
    }
  },
  error => {
    
  }
  )
   
  }
  getType(tipo: String)
  {

   
   this._productService.getProductsType(tipo).subscribe(
    response =>{
    if(response.products){
      this.products=response.products;
     
      
    }
  },
  error => {
   
    
  }
  )
   
  }

}
