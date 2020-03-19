import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Notice} from '../models/notice';
import {Global} from './global';
@Injectable()
export class NoticeService{
    public url:String;
constructor(
    private _http : HttpClient
){
this.url=Global.url;
}
testService(){
    return 'Probando el servicio';
}
saveNotice(notice: Notice): Observable <any>{
    let params = JSON.stringify(notice);
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.post(this.url+'notice/save-notice',params,{headers:headers});
}
getNotices(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'notice/notices',{headers:headers});

}
deleteNotice(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url+'notice/delete/'+id,{headers:headers});
}
}