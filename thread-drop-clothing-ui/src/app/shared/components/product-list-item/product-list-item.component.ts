import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {
  @Input() product:any;
  @Input() productName:any;
  @Input() productPrice:any;
  @Input() productImage:any;
  @Output() productClick = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  onProductClick(productId:string){
    this.productClick.emit(productId)
  }
}
