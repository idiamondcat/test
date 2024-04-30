import { Routes } from '@angular/router';
import { ErrorPageComponent } from './product/pages/error-page/error-page.component';
import { TaskListComponent } from './product/pages/task-list/task-list.component';
import { TaskDetailsComponent } from './product/pages/task-details/task-details.component';

export const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'details/:id', component: TaskDetailsComponent },
  { path: 'not-found', component: ErrorPageComponent },
  { path: '**', redirectTo: 'not-found' }
];
