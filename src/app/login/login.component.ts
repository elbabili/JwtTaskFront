import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mode:number = 0;

  constructor(private authService:AuthenticationService, private router:Router) { }

  ngOnInit() {
      this.authService.logOut();
  }

  onLogin(user){
    this.authService.login(user)
        .subscribe( resp=>{
              let jwt = resp.headers.get('authorization');
              //console.log(jwt);
              this.authService.saveToken(jwt);
              this.router.navigateByUrl('/tasks');
              //this.mode = 0;
        },err=>{
              this.mode = 1;
        })
  }

  onRegister(){
      this.router.navigateByUrl('/register');
  }

}
