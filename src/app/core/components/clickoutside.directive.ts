import { Directive, ElementRef, EventEmitter, HostListener, Output } from "@angular/core";

@Directive({selector: '[clickOutside]'})

export class ClickOutside  {
  
  @Output() clickOutside:EventEmitter<Event> = new EventEmitter<Event>();

  constructor(private _eref: ElementRef) { }

  @HostListener('body:click', ['$event'])
  private onClickBody(event) {
    if (!this.isClickInElement(event)) {
        this.clickOutside.emit(event);
    }
  }

  private isClickInElement(e:any):boolean {
    console.log('this.isClickInElement condition');
    console.log(this._eref.nativeElement.contains(e.target));
    return this._eref.nativeElement.contains(e.target);
  }
}