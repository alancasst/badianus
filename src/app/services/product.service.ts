import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Product} from '../models/product';
import {Global} from './global';

@Injectable()
export class ProductService{
    public url:String;
  
constructor(
    private _http : HttpClient
){
this.url=Global.url;
}
testService(){
    return 'Probando el servicio';
}
saveProduct(product: Product): Observable <any>{
    let params = JSON.stringify(product);
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.post(this.url+'product/save-product',params,{headers:headers});
}
getProducts(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    
    return this._http.get(this.url+'product/products',{headers:headers});

}
getProductReviews(product): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'review/product-reviews/'+product,{headers:headers});

}
deleteProduct(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url+'product/delete/'+id,{headers:headers});
}
getProductsBrand(brand): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'product/products-brand/'+brand,{headers:headers});

}
getProductsType(tipo): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'product/products-type/'+tipo,{headers:headers});

}
getProduct(id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'product/product/'+id,{headers:headers});
}
getMostWanted(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'product/products-wanted',{headers:headers});
}
updateProduct(product: Product): Observable<any>{
    let params = JSON.stringify(product);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url+'product/'+product._id, params,{headers:headers});
}


}