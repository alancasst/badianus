import { Component, OnInit } from '@angular/core';
import {File} from '../../models/file';
import {FileService} from '../../services/file.service';
import {UploadService} from '../../services/upload.service';
import {Global} from '../../services/global';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../../services/auth.service';

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

  constructor(
    private _fileService: FileService,
    private _uploadService: UploadService,
    private _Authservice : AuthService
  ) { 
    
    this.file = new File('','','');
    this.url=Global.url;
    this.confirm=false;
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
  
    this._fileService.saveFile(this.file).subscribe(
      response=>{
        if (response.file){
        
          this._uploadService.makeFileRequest(Global.url+"file/upload-file/"+response.file._id,[],this.filestoUpload,'url').then((result:any)=>{
            this.status = 'success';  
            form.reset();
            setTimeout(function() {
            
              $('.alert').fadeOut('fast');
              location.href="http://localhost:4200/documentos";
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
              location.href="http://localhost:4200/documentos";
            }
          }
         )
        
      }

}
