import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Testimonial} from '../models/testimonial';
import {Global} from './global';

@Injectable()
export class TestimonialService{
    public url:String;
constructor(
    private _http : HttpClient
){
this.url=Global.url;
}
testService(){
    return 'Probando el servicio';
}
saveTestimonial(testimonial: Testimonial): Observable <any>{
    let params = JSON.stringify(testimonial);
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.post(this.url+'testimonial/save-testimonial',params,{headers:headers});
}
getTestimonials(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'testimonial/testimonials',{headers:headers});

}
deleteTestimonial(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url+'testimonial/delete/'+id,{headers:headers});
}
}