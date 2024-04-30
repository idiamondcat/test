import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ITask, ITasks } from "../../product/models/task";

const selectTasksSlice = createFeatureSelector<ITasks>('tasks');
export const selectTasks = createSelector(
    selectTasksSlice,
    (state: ITasks): ITask[] | null => (state.tasks ? state.tasks : null)
);
export const selectTaskById = (id: number) => createSelector(
    selectTasks,
    (state: ITask[] | null): ITask | null => (state ? state.filter(item => item.id === id)[0] : null)
);
