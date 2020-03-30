import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product';
import {ProductService} from '../../services/product.service';
import {UploadService} from '../../services/upload.service';
import{Global} from '../../services/global';
import {Router,ActivatedRoute,Params} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProductService,UploadService]
})
export class EditComponent implements OnInit {
  public product: Product;
  public status: String;
  public filestoUpload: Array<File>;
  public products : Product[];
  public url: String;
  public confirm: boolean;
  public save_product;


  constructor(
    private _productService: ProductService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.product = new Product('','','','','','','','','','',false,'');
    this.url=Global.url;
    this.confirm=false;
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
               
      },
      error =>{
        console.log(<any>error);
      }
    )
   
  
  }

  onSubmit(arg){
    this._productService.updateProduct(this.product).subscribe(
      response=>{
        if (response.product){

          if(this.filestoUpload){
            this._uploadService.makeFileRequest(Global.url+"product/upload-file/"+response.product._id,[],this.filestoUpload,'image').then((result:any)=>{
              
              this.save_product = result.product;
              this.status = 'success';  
              setTimeout(function() {
              
                $('.alert').fadeOut('fast');
                location.href="https://badianus-bbadd.web.app/productos-admin";
            }, 1500);
           
             
            });
          }else{
            this.save_product=response.product;
            this.status = 'success';  
            setTimeout(function() {
            
              $('.alert').fadeOut('fast');
              location.href="https://badianus-bbadd.web.app/productos-admin";
          }, 1500);
         
          }
         
        
        }else{ 
            this.status = 'failed';
        }
        
       
      },
      error =>{
        console.log("NO EXITO BRO");
      }
    );
    }
    fileChangeEvent(fileInput: any){
  
      this.filestoUpload = <Array<File>>fileInput.target.files;
      }
      mostWantedTrue(){
        this.product.wanted = true;
      }
  
      mostWantedFalse(){
        this.product.wanted = false;
      }
  
}

