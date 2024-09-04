import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-luxury-layout',
  templateUrl: './luxury-layout.component.html',
  styleUrls: ['./luxury-layout.component.scss']
})
export class LuxuryLayoutComponent implements OnInit {
  option:string="luxury"
  constructor() { }

  ngOnInit(): void {
  }

}
