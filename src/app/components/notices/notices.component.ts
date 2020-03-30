import { Component, OnInit } from '@angular/core';
import{Notice} from '../../models/notice';
import {NoticeService} from '../../services/notice.service';
import {AuthService} from '../../services/auth.service';
import{Global} from '../../services/global';



@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.css'],
  providers: [NoticeService,AuthService]
})
export class NoticesComponent implements OnInit {

  user: Object;
  public range =false;
  public title: String;
  public notice: Notice;
  public status: String;
  public filestoUpload: Array<File>;
  public notices : Notice[];
  public url: String;
  public confirm: boolean;
  todayString : string = new Date().toDateString();
  constructor(
    private _Noticeservice: NoticeService,
    private _Authservice: AuthService
  ) { 
    this.title = "Añadir Aviso";
    this.notice = new Notice('','','',this.todayString);
    this.url=Global.url;
    this.confirm=false;
  }

  ngOnInit(): void {
    this.getNotices();
    this._Authservice.getProfile().subscribe(profile=>{
      this.user= profile.user;
      if(profile.user.role=="Administrador")
      this.range=true;
      
    });

    
    
  }
  onSubmit(form){
  
    this._Noticeservice.saveNotice(this.notice).subscribe(
      response=>{
        if (response.notice){
          
          this.status = 'success';  
            form.reset();
            setTimeout(function() {
            
              $('.alert').fadeOut('fast');
              location.href="https://badianus-bbadd.web.app/avisos";
          }, 1500);
          
        }else{
            this.status = 'failed';
        }
        
       
      },
      error =>{
        console.log("NO EXITO BRO");
      }
    );
    }
    getNotices(){
      this._Noticeservice.getNotices().subscribe(
        response =>{
          console.log(response);
          if (response.notices){
            this.notices = response.notices;
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
    deleteNotice(id){
      this._Noticeservice.deleteNotice(id).subscribe(
        response =>{
          if (response.notice){
            console.log("borrado");
            location.href="https://badianus-bbadd.web.app/avisos";
          }
        }
       )
      
    }

}
