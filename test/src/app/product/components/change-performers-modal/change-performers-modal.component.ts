import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { changePerformers } from '../../../redux/actions/task.actions';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
// import employees from '../../mock/employees.json';

@Component({
  selector: 'app-change-performers-modal',
  standalone: true,
  imports: [MatDialogModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatChipsModule, MatAutocompleteModule, MatSnackBarModule],
  templateUrl: './change-performers-modal.component.html',
  styleUrl: './change-performers-modal.component.scss'
})
export class ChangePerformersModalComponent {
  @ViewChild('employeeInput') employeeInput: ElementRef<HTMLInputElement>;
  performersForm = this.builder.group({
    newPerformers: this.builder.array<string>([...this.data.performers], [Validators.required, Validators.minLength(1)])
  });
  allEmployees: string[] = ['Петр', 'Алексей', 'Анна', 'Дмитрий', 'Кристина'];
  filteredEmployees: Observable<string[]>;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: number, performers: string[]},
  private builder: FormBuilder,
  private store: Store,
  public dialogRef: MatDialogRef<ChangePerformersModalComponent>,
  private snackBar: MatSnackBar) {}

  get newPerformers(): FormArray<any> {
    return this.performersForm.get('newPerformers') as FormArray;
  }

  removeEmployee(idx: number): void {
    if (idx >= 0)
      this.newPerformers.removeAt(idx);
  }

  addEmployee(event: MatChipInputEvent): void {
    const value: string = (event.value || '').trim();
    if (value) {
      this.newPerformers.push(this.builder.control(value));
    }
    event.chipInput!.clear();
  }

  selectedEmployee(event: MatAutocompleteSelectedEvent): void {
    if (!this.newPerformers.value.includes(event.option.viewValue)) {
      this.newPerformers.push(this.builder.control(event.option.viewValue));
      this.employeeInput.nativeElement.value = '';
    }
  }

  savePerformers(): void {
    const performersArr = this.newPerformers.getRawValue();
    this.store.dispatch(changePerformers({id: this.data.id, performers: performersArr}));
    this.dialogRef.close();
    this.snackBar.open('Исполнители изменены', '', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }
}
