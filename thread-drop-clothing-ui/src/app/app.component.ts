import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ShopifyService } from './core/services/shopify.service';
import { AppState } from 'src/app/state/app.state';
import * as ProductActions from '../app/state/product/product.actions'
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'THREAD DROP';
  isSplashVisible = true;
  
  
  constructor(private router:Router, 
    private shopifyService:ShopifyService,
    private store:Store<AppState>){}
  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts())
    this.showSplashScreen();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
  }

  showSplashScreen() {
    const splashDisplayed = localStorage.getItem('splashDisplayed');
    
    if (!splashDisplayed) {
      // Display the splash screen for 3 seconds before animating
      setTimeout(() => {
        document.querySelector('.splash-screen')?.classList.add('splash-exit'); // Trigger the animation

        // Wait for the animation to finish before hiding the splash
        setTimeout(() => {
          this.isSplashVisible = false;
          localStorage.setItem('splashDisplayed', 'true');
        }, 1000); // This should match the animation duration
      }, 1500); // Keep the splash screen visible for 3 seconds before starting the animation
    } else {
      this.isSplashVisible = false;
    }
  }

 
  recoverPassword(){
    this.shopifyService.recoverCustomerPassword('faizantherooster@gmail.com').subscribe((res)=>{

      console.log(res);
      
    })
  }

  
}


