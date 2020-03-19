import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/users';
import {Global} from './global';
@Injectable()
export class UserService{
    public url:String;
    authToken: any;
    user: any;
constructor(
    private _http : HttpClient
){
this.url=Global.url;
}
testService(){
    return 'Probando el servicio';
}
saveUser(user: User): Observable <any>{
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.post(this.url+'user/save-user',params,{headers:headers});
}
getUsers(): Observable<any>{
    this.loadtoken();
    const headers = new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authToken
      });
    return this._http.get(this.url+'user/users',{headers:headers});

}
deleteUser(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url+'user/delete/'+id,{headers:headers});
}
loadtoken(){
    const token = localStorage.getItem('id_token');
    this.authToken= token ;
  
}
}