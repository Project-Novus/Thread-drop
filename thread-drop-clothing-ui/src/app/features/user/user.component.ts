import { Component, OnInit } from '@angular/core';
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
  constructor(private shopifyService:ShopifyService) { }

  ngOnInit(): void {
    this.customerAccessToken = JSON.parse(localStorage.getItem('customerAccessToken') as string);
   this.isLoggedIn = this.customerAccessToken ? true : false;
    if(this.isLoggedIn)
    this.getCustomeData(this.customerAccessToken?.accessToken)  
  }
  loginEvent(event:any){
    this.isLoggedIn = event.isLoggedIn;
    this.getCustomeData(event?.customerAccessToken)
  }
  getCustomeData(customerAccessToken:string){
    this.shopifyService.getCustomerData(customerAccessToken).subscribe({
      next:(res)=>{
        console.log(res,"Customer Data");
        this.customerData = res.data.customer
      },
      error:(err)=>{console.log(err);
      }
    })
  }
}
