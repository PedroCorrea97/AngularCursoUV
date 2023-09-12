import { Directive, ElementRef, Input, OnInit, inject } from '@angular/core';

@Directive({
    selector: '[uvClass]',
    standalone: true
})
export class UvClassDirective implements OnInit {
  private elementRef = inject(ElementRef)
  @Input () uvClass! : String;

  constructor() { }

  ngOnInit() {
    this.elementRef.nativeElement.classList.add(this.uvClass)
  }
  

}
