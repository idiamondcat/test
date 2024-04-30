import { Component, InputSignal, input } from '@angular/core';
import { ITask } from '../../models/task';
import { CommonModule } from '@angular/common';
import { PriorityDirective } from '../../directives/priority.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, PriorityDirective],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  taskData: InputSignal<ITask | undefined> = input<ITask>();

  constructor(private router: Router) {}

  openTask(): void {
    this.router.navigate(['/details', this.taskData()?.id]);
  }
}
