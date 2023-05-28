import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../services/customer.service";
import {Customer} from "../model/customer.model";
import {AccountsService} from "../services/accounts.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Account} from "../model/account.model";

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {
  newAccountFormGroup! : FormGroup;
  customers! : Observable<Array<Customer>>;
  constructor(private fb : FormBuilder, private accountService : AccountsService, private customerService : CustomerService, private router : Router) { }

  ngOnInit(): void {
    this.newAccountFormGroup=this.fb.group({
      accountNumber : this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      accountType : this.fb.control(null, [Validators.required]),
      customerId : this.fb.control(null, [Validators.required])
    });
    this.customers=this.customerService.getCustomers();
  }

  handleSaveAccount() {
    let account : Account=this.newAccountFormGroup.value;
    this.accountService.saveAccount(account).subscribe({
      next : data=>{
        alert("Account has been successfully saved!");
        this.newAccountFormGroup.reset();
        this.router.navigateByUrl("/accounts");
      },
      error : err => {
        console.log(err);
      }
    });
  }
}
