import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss']
})
export class ComingSoonComponent implements OnInit {

  targetDate = new Date(Date.UTC(2025, 2, 1)); // March 1st, 2025 (UTC time)
  timeRemaining: any = {};
  private timer: any;

  ngOnInit() {
    this.updateTimer();
    this.timer = setInterval(() => this.updateTimer(), 1000);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private updateTimer() {
    const now = new Date().getTime();
    const difference = this.targetDate.getTime() - now;

    if (difference <= 0) {
      clearInterval(this.timer);
      this.timeRemaining = { expired: true };
      return;
    }

    this.timeRemaining = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000)
    };
  }

  padNumber(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }
}
