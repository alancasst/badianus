import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {File} from '../models/file';
import {Global} from './global';
@Injectable()
export class FileService{
    public url:String;
constructor(
    private _http : HttpClient
){
this.url=Global.url;
}
testService(){
    return 'Probando el servicio';
}
saveFile(file: File): Observable <any>{
    let params = JSON.stringify(file);
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.post(this.url+'file/save-file',params,{headers:headers});
}
getFiles(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'file/files',{headers:headers});

}
deleteFile(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url+'file/delete/'+id,{headers:headers});
}
}