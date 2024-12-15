import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-chips',
  templateUrl: './filter-chips.component.html',
  styleUrls: ['./filter-chips.component.scss']
})
export class FilterChipsComponent implements OnInit {
  @Input() category:string="";
  constructor() { }

  ngOnInit(): void {
  }

}
