import { Component, OnInit } from '@angular/core';
import { faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import { faCaretDown} from '@fortawesome/free-solid-svg-icons';
import{AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {Product} from '../../models/product';
import {ProductService} from '../../services/product.service';
import {Global} from '../../services/global';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [AuthService,ProductService]
})
export class IndexComponent implements OnInit {

  
  faCaretDown= faCaretDown;
  public url: String;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  email: String;
  password: String;
  faSignIn = faSignInAlt;
  public products : Product[];

  constructor( 
    private authService: AuthService, 
    private router: Router,
    private _productService: ProductService
    ) { 
      this.url=Global.url;
    }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(){
    this._productService.getMostWanted().subscribe(
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
}
