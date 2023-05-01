import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  formGroup!:FormGroup;
  constructor(private fb:FormBuilder){}

  ngOnInit(): void {

    this.formGroup=this.fb.group({
      username:this.fb.control(""),
      password:this.fb.control("")
    });
    
  }
handleLogin(){
  
}


}
