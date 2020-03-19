import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product';
import {Review} from '../../models/review';
import {ProductService} from '../../services/product.service';
import {ReviewService} from '../../services/review.service';
import {Global} from '../../services/global';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {faLeaf,faRuler,faClipboardList,faTag,faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers:[ProductService,ReviewService]
})
export class DetailComponent implements OnInit {
  public url : string;
  public product : Product;
  faLeaf = faLeaf;
  faRuler = faRuler;
  faCategorie = faClipboardList;
  faBrand= faTag;
  faUser= faUser;
  public review: Review;
  public reviews: Review[];
  public status: String;
  public titleReview: String;
  todayString : string = new Date().toDateString();
  constructor(
    private _productService: ProductService,
    private _reviewService: ReviewService,
    private _router: Router,
    private _route: ActivatedRoute

    
  ) { 
    this.review = new Review('','','',0,'',this.todayString);
    this.url=Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params =>{
      let id = params.id;
      this.getProduct(id);     
    })
   
  }


  getProduct(id){
    this._productService.getProduct(id).subscribe(
      response => {
            this.product = response.product;     
            this.titleReview= response.product.title;
            console.log(this.titleReview);   
            this.getProductReview(this.titleReview);      
      },
      error =>{
        console.log(<any>error);
      }
    )
   
  
  }
   getProductReview(product: String){

    this._productService.getProductReviews(product).subscribe(
      response => {
            this.reviews = response.reviews;
            console.log(response);
      },
      error =>{
        console.log(<any>error);
      }
    )
  }
  onSubmit(form){
    this.review.product = this.product.title;
    this._reviewService.saveReview(this.review).subscribe(
      response=>{
        if (response.review){
          
          this.status = 'success';  
            form.reset();
            setTimeout(function() {
            
              $('.alert').fadeOut('fast');
            
          }, 1500);
          
        }else{
            this.status = 'failed';
        }
        
       
      },
      error =>{
        console.log("NO EXITO BRO");
      }
    );
    }

}
