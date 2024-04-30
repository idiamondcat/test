import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { ITask } from '../../models/task';
import { selectTaskById } from '../../../redux/selectors/task.selectors';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PriorityDirective } from '../../directives/priority.directive';
import { MatDialog } from '@angular/material/dialog';
import { ChangeStatusModalComponent } from '../../components/change-status-modal/change-status-modal.component';
import { ChangePerformersModalComponent } from '../../components/change-performers-modal/change-performers-modal.component';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, PriorityDirective],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent implements OnInit {
  private id: number;
  public taskData$: Observable<ITask | null>;

  constructor(private route: ActivatedRoute, private store: Store, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.id = Number(params['id'])));
    this.taskData$ = this.store.select(selectTaskById(this.id));
  }

  editStatus(status: string): void {
    const dialogRef = this.dialog.open(ChangeStatusModalComponent, {
      width: '600px',
      data: { id: this.id, status: status }
    })
  }

  editPerformers(performers: (string | null)[]): void {
    const dialogRef = this.dialog.open(ChangePerformersModalComponent, {
      width: '600px',
      data: { id: this.id, performers: performers }
    })
  }
}
