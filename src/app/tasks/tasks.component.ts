import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks;
  admin=false;

  constructor(public authService:AuthenticationService, private router:Router) { }

  ngOnInit() {
      this.authService.getTasks()
          .subscribe( data=>{
              this.tasks = data;
              this.admin = this.authService.isAdmin();
          },err=>{
              this.authService.logOut();  //si mon token a expiré, je dois le supprimer pour me reconnecter au back
              this.router.navigateByUrl('/login');
          })
  }

  onNewTask(){
      this.router.navigateByUrl('/new-task');
  }

  //afin de limiter les accès au serveur
  isAdmin(){
      return this.admin;
  }

}
