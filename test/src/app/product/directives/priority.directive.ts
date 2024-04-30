import { Directive, ElementRef, OnInit, Renderer2, input } from '@angular/core';
import { Priority } from '../models/priority';

@Directive({
  selector: '[appPriority]',
  standalone: true
})
export class PriorityDirective implements OnInit {
  priority = input<string>();
  constructor(private elem: ElementRef, private render: Renderer2) {}

  ngOnInit(): void {
    this.addColor();
  }

  addColor() {
    switch(this.priority()) {
      case Priority.low: this.render.addClass(this.elem.nativeElement, 'priority-low');
      break;
      case Priority.medium: this.render.addClass(this.elem.nativeElement, 'priority-medium');
      break;
      case Priority.high: this.render.addClass(this.elem.nativeElement, 'priority-high');
      break;
      default: this.render.addClass(this.elem.nativeElement, 'priority-unknown');
      break;
    }
  }
}
