import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product';
import {ProductService} from '../../services/product.service';
import {UploadService} from '../../services/upload.service';
import{Global} from '../../services/global';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import { faEdit} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.css'],
  providers: [ProductService,UploadService]
})
export class ProductsAdminComponent implements OnInit {

  public product: Product;
  public status: String;
  public filestoUpload: Array<File>;
  public filestoUpload2: Array<File>;
  public products : Product[];
  public url: String;
  public confirm: boolean;
  faTrash = faTrash;
  faEdit=faEdit;

  constructor(
    private _productService: ProductService,
    private _uploadService: UploadService,
  ) { 
    this.product = new Product('','','','','','','','','','',false,'');
    this.url=Global.url;
    this.confirm=false;
  }

  ngOnInit(): void {
    this.getProducts();
  }
  onSubmit(form){
  
    this._productService.saveProduct(this.product).subscribe(
      response=>{
        if (response.product){
          
          
          this._uploadService.makeFileRequest(Global.url+"product/upload-file/"+response.product._id,[],this.filestoUpload2,'image2').then((result:any)=>{
            this.status = 'success';  
          });
          
          this._uploadService.makeFileRequest(Global.url+"product/upload-file/"+response.product._id,[],this.filestoUpload,'image').then((result:any)=>{
            this.status = 'success';  
            
            form.reset();
            setTimeout(function() {
            
              $('.alert').fadeOut('fast');
              location.href="http://localhost:4200/productos-admin";
          }, 1500);
         
           
          });
        
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
    fileChangeEvent2(fileInput2: any){
  
      this.filestoUpload2 = <Array<File>>fileInput2.target.files;
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
    setConfirm(confirm){
      this.confirm=confirm;
    }
    deleteProduct(id){
      this._productService.deleteProduct(id).subscribe(
        response =>{
          if (response.product){
            console.log("borrado");
            location.href="http://localhost:4200/productos-admin";
          }
        }
       )
      
    }
    mostWantedTrue(){
      this.product.wanted = true;
    }

    mostWantedFalse(){
      this.product.wanted = false;
    }

  
  }
  



