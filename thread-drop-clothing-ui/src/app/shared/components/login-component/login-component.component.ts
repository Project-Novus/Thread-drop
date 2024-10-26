import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShopifyService } from 'src/app/core/services/shopify.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent implements OnInit {
  formSubmitted:boolean = false;
  contactForm!: FormGroup<any>;
  loading:boolean = false;
  loginError:boolean = false;
  customerAccessToken:string | null | any = null;
  @Output() loginEvent: EventEmitter<any> = new EventEmitter()
  constructor(private fb:FormBuilder,
              private shopifyService:ShopifyService
  ) {  }
  
  submittedFormData:any;
  ngOnInit(): void {
    this.contactForm = this.fb.group({
      password:['', Validators.required],
      email:['', [Validators.required, Validators.email]]
    })
    
  }
  // Accessors for form controls in your template
  get email() { return this.contactForm?.get('email'); }
  get password() { return this.contactForm?.get('password'); }
  closeDialog(){
   
    this.contactForm.reset()
  }
  login(){
      const email = this.contactForm.get('email')?.value;
      const password = this.contactForm.get('password')?.value;
      if (this.contactForm.controls['password'].valid && 
          this.contactForm.controls['email'].valid) {
        // Form is valid, proceed with submission
        this.loading = true
        this.shopifyService.customerLogin(email,password)
        .subscribe({
          next: (res)=>{
            console.log(res,"customer logged in")
            this.customerAccessToken = res.data.customerAccessTokenCreate.customerAccessToken
            localStorage.setItem('customerAccessToken',JSON.stringify(this.customerAccessToken))
            this.loginError = this.customerAccessToken === null ? true : false 
            this.loading = false
            if(!this.loginError){
              this.loginEvent.emit({isLoggedIn: true, 
                customerAccessToken:this.customerAccessToken.accessToken}
              )
            }
          },
          error: (err)=>{
            console.log(err,"customer login failed")
            this.loading = false

          }
        });
      } else {
        // Form is invalid, mark controls as touched to display errors
        this.contactForm.markAllAsTouched();
        this.loading = false
      }
    
  }

}

