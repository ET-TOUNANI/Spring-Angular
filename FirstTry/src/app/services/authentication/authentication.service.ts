import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';
import { User } from 'src/app/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  users:User[]=[];

  constructor() {
    this.users.push({id:UUID.UUID(),username:"admin",password:"1111",name:"abbo",age:20,roles:['USER','ADMIN']})
    this.users.push({id:UUID.UUID(),username:"user1",password:"2222",name:"youssef",age:18,roles:['USER']})
    this.users.push({id:UUID.UUID(),username:"user2",password:"3333",name:"khadija",age:54,roles:['USER']})
   }
   login(username:string,password: string):Observable<User>{
    let user=this.users.find(u=>u.username===username);

    if(user!=undefined && user.password===password){
      return of(user);
    }
    return throwError(()=>new Error("username or password are incorrect"));
   }
   
}
