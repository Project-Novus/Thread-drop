import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'THREAD DROP';
  isSplashVisible = true;
  constructor(private router:Router){}
  ngOnInit(): void {
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
}
