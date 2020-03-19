import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/users';
import {Global} from './global';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService{
    authToken: any;
    user: any;
    public url:String;
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

    return this._http.post(this.url+'user/save-user2',params,{headers:headers});
}
authenticateUser(user){
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.post(this.url+'user/authenticate',params,{headers:headers})
}
storeUserData(token,user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken= token;
    this.user= user;  
}
logout(){
    this.authToken=null;
    this.user=null;
    localStorage.clear();
}
getProfile(): Observable<any>{
    this.loadtoken();
    const headers = new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authToken
      });
    return this._http.get(this.url+'user/profile',{headers:headers});

}
getCurrentUser(){
   if(localStorage.getItem('id_token')==null){
    console.log("entra a falso bro");
       return false;
   }else{
    console.log("entra a true");
       return true;
      
   }
}
loadtoken(){
    const token = localStorage.getItem('id_token');
    this.authToken= token;
  
}


}