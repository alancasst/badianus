import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Review} from '../models/review';
import {Global} from './global';
@Injectable()
export class ReviewService{
    public url:String;
constructor(
    private _http : HttpClient
){
this.url=Global.url;
}
testService(){
    return 'Probando el servicio';
}
saveReview(review: Review): Observable <any>{
    let params = JSON.stringify(review);
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.post(this.url+'review/save-review',params,{headers:headers});
}
getReviews(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'review/reviews',{headers:headers});

}
deleteReview(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url+'review/delete/'+id,{headers:headers});
}
}