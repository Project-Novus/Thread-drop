import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SelectedSize } from '../../models/sizeModel';

@Component({
  selector: 'app-size-selector',
  templateUrl: './size-selector.component.html',
  styleUrls: ['./size-selector.component.scss']
})
export class SizeSelectorComponent implements OnInit,OnChanges {
  @Input() size:string ='';
  @Input() selectedData:SelectedSize | undefined = undefined;
  // @Output() sizeSelected = new EventEmitter<{}>();
  isSizeSelected:boolean = false;
  constructor() {
   }
  ngOnChanges(changes: SimpleChanges): void {    
    this.onSizeSelect();
  }

  ngOnInit(): void {
  }
  onSizeSelect():void{
    this.isSizeSelected = (this.selectedData?.size === this.size
                          && this.selectedData?.isSelected === true) ?
                          true :
                          false;
                          
  }

}
