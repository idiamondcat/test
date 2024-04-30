import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { TaskComponent } from '../../components/task/task.component';
import { ITask } from '../../models/task';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { selectTasks } from '../../../redux/selectors/task.selectors';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Priority } from '../../models/priority';
import { Status } from '../../models/status';
import { SortByPipe } from '../../../product/pipes/sort-by.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../components/modal/modal.component';
import { PerformersPipe } from '../../pipes/performers.pipe';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskComponent, MatFormFieldModule, MatSelectModule, SortByPipe, PerformersPipe, MatIconModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  allTasks: ITask[] | null;
  destroyRef = inject(DestroyRef);
  priority: typeof Priority = Priority;
  status: typeof Status = Status;
  allEmployees: string[] = ['Петр', 'Алексей', 'Анна', 'Дмитрий', 'Кристина'];
  isASC: boolean = true;
  sortMethod: string = '';
  employee: string = '';

  constructor(public dialog: MatDialog, private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectTasks).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      this.allTasks = res;
    });
  }

  sortBy(val: string): void {
    if (this.isASC) this.isASC = false;
    else this.isASC = true;
    this.sortMethod = val;
  }

  filterByPerformers(event: any): void {
    this.employee = event.value;
  }

  createTask(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '600px'
    })
  }
}
