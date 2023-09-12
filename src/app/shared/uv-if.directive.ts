import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[uvIf]',
    standalone: true
})
export class UvIfDirective {
  _uvIf!:boolean;
  
  constructor( 
    private _viewContainer : ViewContainerRef,
    private templateRef:TemplateRef<any> ) {  }
    
    @Input()
    set uvIf(condition:boolean){
      this._uvIf = condition;
      this._updateView();
    }
    
    _updateView() {
      if( this._uvIf) { 
        this._viewContainer.createEmbeddedView(this.templateRef);
       }else {
        this._viewContainer.clear();
       }
    }
}
