import { Component, OnInit } from '@angular/core';
import {File} from '../../models/file';
import {FileService} from '../../services/file.service';
import {UploadService} from '../../services/upload.service';
import {Global} from '../../services/global';
import {faTrash, faTasks} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../../services/auth.service';
import {faDownload} from '@fortawesome/free-solid-svg-icons';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { stringify } from 'querystring';
import {DomSanitizer,SafeUrl} from '@angular/platform-browser';
import { PipeTransform, Pipe } from "@angular/core";

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css'],
  providers: [FileService,UploadService,AuthService]
})

export class FilesComponent implements OnInit {

  user: Object;
  public range =false;
  public title: String;
  public file: File;
  public status: String;
  public filestoUpload: Array<File>;
  public files : File[];
  public url: String;
  public confirm: boolean;
  faTrash = faTrash;
  faDownload = faDownload;
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  public urlsave: String;
  GenuineUrl : SafeUrl;
  urlmagica: String;

  
  constructor(
    private _fileService: FileService,
    private _uploadService: UploadService,
    private _Authservice : AuthService,
    private storage : AngularFireStorage,
    private sanitizer:DomSanitizer

  ) { 
    
    this.file = new File('','','');
    this.url=Global.url;
    this.confirm=false;
  }

  sanitize(url:string){
    this.GenuineUrl= this.sanitizer.bypassSecurityTrustUrl(url);
    return this.GenuineUrl;
    
}
transform(value: string) {
  return this.sanitizer.bypassSecurityTrustUrl(value);
}

  ngOnInit(): void {

    this.getFiles();
    this._Authservice.getProfile().subscribe(profile=>{
      this.user= profile.user;
   
      if(profile.user.role=="Administrador")
      this.range=true;
      
    });
  }
  
  onSubmit(form){
  
    console.log(this.filestoUpload[0]);
    const id = Math.random().toString(36).substring(2);
      const archive = this.filestoUpload[0];
      const fileroute = `uploads/${id}`;
      const ref = this.storage.ref(fileroute);
      const task = this.storage.upload(fileroute,archive);
      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(finalize(()=> this.urlImage=ref.getDownloadURL())).subscribe();
  
      console.log(this.urlImage);
   
    this._fileService.saveFile(this.file).subscribe(
      response=>{
        if (response.file){
             // @ts-ignore
          this._uploadService.makeFileRequest(Global.url+"file/upload-file/"+response.file._id,[],this.filestoUpload,'url').then((result:any)=>{
            this.status = 'success';  
            form.reset();
            setTimeout(function() {
            
              $('.alert').fadeOut('fast');
              //location.href="https://badianus-bbadd.web.app/documentos";
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
      console.log(fileInput.target.files[0]);
      

      }
      getFiles(){
        this._fileService.getFiles().subscribe(
          response =>{
            console.log(response);
            if (response.files){
              this.files = response.files;
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
      deleteFile(id){
        this._fileService.deleteFile(id).subscribe(
          response =>{
            if (response.file){
              console.log("borrado");
              location.href="https://badianus-bbadd.web.app/documentos";
            }
          }
         )
        
      }

      public quitarComillasDobles(originalString: string) : string {
        return originalString
                .replace('"', '')
                .replace('"', '');
      }
}
