import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  constructor(private http:HttpClient) { }

  geetData(url:string):Observable<Array<Customer>>{
   return this.http.get<Array<Customer>>(url);
  }
}
