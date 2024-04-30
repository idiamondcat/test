import { Pipe, PipeTransform } from '@angular/core';
import { ITask } from '../models/task';

@Pipe({
  name: 'performers',
  standalone: true
})
export class PerformersPipe implements PipeTransform {

  transform(items: ITask[], value: string): ITask[] {
    return value === ''
    ? items
    : items.filter(
          (item: ITask): boolean =>
            item.performers.some((performer: string | null): boolean =>
              performer === value
            )
        );
  }

}
