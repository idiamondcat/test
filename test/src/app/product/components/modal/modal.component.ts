import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MatSelectModule } from '@angular/material/select';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent, MatAutocompleteModule } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import * as moment from 'moment';
import { Observable, map, startWith } from 'rxjs';
import { Store } from '@ngrx/store';
import { addTask } from 'src/app/redux/actions/task.actions';
import { ITask } from '../../models/task';
import { Priority } from '../../models/priority';
import { Status } from '../../models/status';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatSnackBarModule
  ],
  providers: [provideMomentDateAdapter()],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @ViewChild('employeeInput') employeeInput: ElementRef<HTMLInputElement>;
  addTaskForm = this.builder.group({
    title: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    deadline: new FormControl(moment().format('d MMMM y'), Validators.required),
    priority: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    performers: this.builder.array<string>([], [Validators.required, Validators.minLength(1)])
  })
  priority: typeof Priority = Priority;
  status: typeof Status = Status;
  allEmployees: string[] = ['Петр', 'Алексей', 'Анна', 'Дмитрий', 'Кристина'];
  filteredEmployees: Observable<string[]>;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private builder: FormBuilder, private store: Store, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<ModalComponent>) {
    this.filteredEmployees = this.performers.valueChanges.pipe(
      startWith(null),
      map((employee: string | null): string[] => (employee ? this.allEmployees.filter(emp => emp.includes(employee)) : this.allEmployees.slice())),
    );
  }

  get performers(): FormArray<any> {
    return this.addTaskForm.get('performers') as FormArray;
  }

  removeEmployee(idx: number): void {
    if (idx >= 0)
      this.performers.removeAt(idx);
  }

  addEmployee(event: MatChipInputEvent): void {
    const value: string = (event.value || '').trim();
    if (value) {
      this.performers.push(this.builder.control(value));
    }
    event.chipInput!.clear();
  }

  selectedEmployee(event: MatAutocompleteSelectedEvent): void {
    if (!this.performers.value.includes(event.option.viewValue)) {
      this.performers.push(this.builder.control(event.option.viewValue));
      this.employeeInput.nativeElement.value = '';
    }
  }

  onSubmit(): void {
    const form = this.addTaskForm.getRawValue()!;
    const newObj: ITask = {id: null, ...form};
    this.store.dispatch(addTask(newObj));
    this.dialogRef.close();
    this.snackBar.open('Задача добавлена', '', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }
}
