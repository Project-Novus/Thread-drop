import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerStateService } from 'src/app/core/services/customer-state.service';
import { ShopifyService } from 'src/app/core/services/shopify.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  option:string = 'account'
  isLoggedIn:boolean = false;
  customerAccessToken:any
  customerData:any;
  constructor(private shopifyService:ShopifyService,
    private customerStateService:CustomerStateService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.customerAccessToken = JSON.parse(localStorage.getItem('customerAccessToken') as string);
    this.isLoggedIn = this.customerAccessToken ? true : false;
    if(this.isLoggedIn)
    this.getCustomerData()  


    this.customerStateService.createCustomerAddress({
      address1:"Test",
      city:"Test City",
    },this.customerAccessToken.accessToken)
  }
  loginEvent(event:any){
    this.isLoggedIn = event.isLoggedIn;
    this.getCustomerData()
  }
  getCustomerData(){
    this.customerStateService.loadCustomerProfile()
    this.customerStateService.customer$.subscribe({
      next:(res:any)=>{
        this.customerData = res?.data?.customer
      }
    })
  }

  logout(){
    console.log("Log out")
    localStorage.removeItem("customerAccessToken");
    this.router.navigate(['']);
  }


}
