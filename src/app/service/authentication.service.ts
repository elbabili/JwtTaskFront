import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  //private host:string="http://localhost:8080";
  private host:string = "https://heroku-task31.herokuapp.com";
  private jwtToken = null;
  private roles:Array<any> = new Array<any>();

  constructor(private http:HttpClient) { }

  login(user){
      return this.http.post(this.host+"/login",user,{observe:'response'});
      //observation des entêtes de la réponse http notamment l'entête "autorisation"
      //l'idée ici avec observe, consiste à spécifier de ne pas convertir le résultat au format json,
      // au contraire nous souhaitons exploiter toute la réponse http afin de vérifier si une personne a des droits, si oui, lesquels
  /*    const httpOptions = {
        headers: new HttpHeaders({'Access-Control-Allow-Origin':'*' }),
        observe: 'response' as 'response'
      };
      return this.http.post(this.host+"/login",user,httpOptions);*/
  }

  saveToken(token:string){
      this.jwtToken = token;
      localStorage.setItem('token',token);
      this.roles = jwt_decode(token).roles;
      console.log(this.roles);
  }

  loadToken(){
      this.jwtToken = localStorage.getItem('token');
  }

  getTasks(){   //pour chaque requete envoyé coté back, nous devons ajouté le token
      if(this.jwtToken == null)  this.loadToken();
      //console.log(this.jwtToken);
      return this.http.get(this.host + '/tasks',{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }

  logOut(){
      localStorage.removeItem('token');
      this.jwtToken = null;
  }

  isAdmin(){
      //console.log("isAdmin")
      for(let r of this.roles){
          if(r.authority == 'ADMIN')  return true;
      }
      return false;
  }

  saveTask(task){
      return this.http.post(this.host + '/tasks',task,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }
}
