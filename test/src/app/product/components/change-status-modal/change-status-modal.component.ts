import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Status } from '../../models/status';
import { Store } from '@ngrx/store';
import { changeTask } from '../../../redux/actions/task.actions';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-status-modal',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatSelectModule, MatIconModule, MatSnackBarModule],
  templateUrl: './change-status-modal.component.html',
  styleUrl: './change-status-modal.component.scss'
})
export class ChangeStatusModalComponent {
  status: typeof Status = Status;
  newStatus = new FormControl('', Validators.required);
  selected: string = this.data.status;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: number, status: string},
  private store: Store,
  public dialogRef: MatDialogRef<ChangeStatusModalComponent>,
  private snackBar: MatSnackBar) {}

  saveStatus(): void {
    const status: string = this.selected;
    this.store.dispatch(changeTask({id: this.data.id, status: status}));
    this.dialogRef.close();
    this.snackBar.open('Статус изменен', '', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }
}
