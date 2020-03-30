import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import{Router} from '@angular/router';
import { faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import { faBars} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers:[AuthService]
})
export class NavBarComponent implements OnInit {
  
  user: any;
  range= false;
  display = true;
  email: String;
  password: String;
  faSignIn = faSignInAlt;
  faBars = faBars;

  constructor(
    private _Authservice: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._Authservice.getProfile().subscribe(profile=>{
      this.user= profile.user;
      this.user= profile.user;
      if(profile.user.role=="Administrador")
      this.range=true;
    });
    }

  isLogged(){
  
    if (this._Authservice.getCurrentUser()== true){
      this.display= false;
      return true
    }else{
      return false;
    } 
  }
  onLogOutClick(){
    this._Authservice.logout();
    location.href="https://badianus-bbadd.web.app/";
    
  }

 
}

