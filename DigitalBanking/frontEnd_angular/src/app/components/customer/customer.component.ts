import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit{
  customers!:Observable<Array<Customer>>;
  private url:string="http://localhost:8082/customers";
  errorMessage!:String;
  constructor(private serviceCustomer:CustomerService){}

  ngOnInit(): void {
    // this.serviceCustomer.geetData(this.url).subscribe({
    //   next:(data)=>{
    //     this.customers=data;
    //     console.log(data);
    //   },
    //   error(err) {
    //     console.log(err);
    //   },
    // })
   this.customers= this.serviceCustomer.geetData(this.url).pipe(
    catchError(err=>{
      this.errorMessage=err.message;
      return throwError(err);
    })
   );
  }
}
