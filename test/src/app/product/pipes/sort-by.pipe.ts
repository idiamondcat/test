import { Pipe, PipeTransform } from '@angular/core';
import { ITask } from '../models/task';
import { Status } from '../models/status';
import { Priority } from '../models/priority';

@Pipe({
  name: 'sortBy',
  standalone: true
})
export class SortByPipe implements PipeTransform {
  statusOrder: string[] = [Status.backlog, Status.inprogress, Status.done];
  priorityOrder: string[] = [Priority.low, Priority.medium, Priority.high];
  transform(items: ITask[], sortMethod: string, isASC: boolean): ITask[] {
    const sortItems: ITask[] = [...items];
    switch(sortMethod) {
      case 'deadline':
        return sortItems.sort((prev: ITask, next: ITask): number => {
          return isASC
            ? Date.parse(prev.deadline!) -
                Date.parse(next.deadline!)
            : Date.parse(next.deadline!) -
                Date.parse(prev.deadline!);
        });
      break;
      case 'status':
          return sortItems.sort((prev: ITask, next: ITask): number => {
            return isASC
              ? this.statusOrder.indexOf(prev.status!) -
                  this.statusOrder.indexOf(next.status!)
              : this.statusOrder.indexOf(next.status!) -
                  this.statusOrder.indexOf(prev.status!);
          });
        break;
        case 'priority':
          return sortItems.sort((prev: ITask, next: ITask): number => {
            return isASC
              ? this.priorityOrder.indexOf(prev.priority!) -
                  this.priorityOrder.indexOf(next.priority!)
              : this.priorityOrder.indexOf(next.priority!) -
                  this.priorityOrder.indexOf(prev.priority!);
          });
        break;
        default:
          return sortItems;
        break;
    }
  }

}
