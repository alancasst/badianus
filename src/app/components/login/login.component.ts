import { Component, OnInit } from '@angular/core';
import{AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService, FlashMessagesService]
  
})
export class LoginComponent implements OnInit {
  
  

  email: String = "";
  password: String ="";
  message=false;
  
  constructor(
    private authService: AuthService,
  
      
  ) { 
    
  }

  ngOnInit(): void {
    
  }

  onLoginSubmit(){
    
    const user ={
      email: this.email,
      password: this.password
    }
    this.authService.authenticateUser(user).subscribe( data =>{
      if(data.success){

          this.authService.storeUserData(data.token, data.user);
          

          location.href="http://localhost:4200/avisos";
       
      }
      else {
        this.message =true; 
      }

    });
  }
  onLogOutClick(){
    this.authService.logout();
 
  }

}
