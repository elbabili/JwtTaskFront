import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user:any;
  mode:number = 0;
  errorMessage:string;

  constructor(private authService:AuthenticationService) { }

  ngOnInit() {
  }

  onRegister(user){
      console.log("onRegister");
      this.authService.register(user)
          .subscribe(data =>{
              this.user = data;
              this.mode = 1;
              //console.log("------------ " + user.roles[0].roleName);
          }), err=>{
              this.errorMessage = err.errorMessage;
              this.mode = 0;
          }
  }

}
