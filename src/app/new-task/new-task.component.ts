import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  task;
  mode:number=1;

  constructor(private authService:AuthenticationService, private router:Router) { }

  ngOnInit() {
      if(this.authService.isAdmin() == false){
            this.router.navigateByUrl('/login');
      }
  }

  onSaveTask(task){
      this.authService.saveTask(task)
          .subscribe(resp=>{
              this.task = resp;
              this.mode = 2;
          },err=>{
              this.mode = 0;
          });
  }

}
