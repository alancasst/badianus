import { Component, OnInit } from '@angular/core';
import{User} from '../../models/users';
import {UserService} from '../../services/user.service';
import {UploadService} from '../../services/upload.service';
import {AuthService} from '../../services/auth.service';
import{Global} from '../../services/global';
import {faTrash} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService,UploadService,AuthService]
})
export class UsersComponent implements OnInit {
  public title: String;
  public user: User;
  public status: String;
  public filestoUpload: Array<File>;
  public users : User[];
  public url: String;
  public confirm: boolean;
  faTrash = faTrash;
  constructor(
    private _Userservice: UserService,
    private _uploadService: UploadService,
    private _AuthService: AuthService 
  ) { 
    this.title = "Añadir Usuario";
    this.user = new User('','','','','','');
    this.url=Global.url;
    this.confirm=false;
  }

  ngOnInit(): void {
    this.getUsers();
  }
  /*onSubmit(form){
  
    this._Userservice.saveUser(this.user).subscribe(
      response=>{
        if (response.user){
          
          this.status = 'success';  
            form.reset();
            setTimeout(function() {
            
              $('.alert').fadeOut('fast');
              location.href="http://localhost:4200/usuarios";
          }, 1500);
          
        }else{
            this.status = 'failed';
        }
        
       
      },
      error =>{
        console.log("NO EXITO BRO");
      }
    );
    }*/
    getUsers(){
      this._Userservice.getUsers().subscribe(
        response =>{
          console.log(response);
          if (response.users){
            this.users = response.users;
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
    deleteUser(id){
      this._Userservice.deleteUser(id).subscribe(
        response =>{
          if (response.user){
            console.log("borrado");
            location.href="http://localhost:4200/usuarios";
          }
        }
       )
      
    }
    //Register User
    onRegisterSubmit(form){
      
    this._AuthService.saveUser(this.user).subscribe(
      response=>{
        if (response.user){
          
          this.status = 'success';  
            form.reset();
            setTimeout(function() {
            
              $('.alert').fadeOut('fast');
              location.href="http://localhost:4200/usuarios";
          }, 1500);
          
        }else{
            this.status = 'failed';
        }
    }
    )
}
}








 

  
 
  
 
