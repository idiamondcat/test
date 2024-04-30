import { createAction, props } from "@ngrx/store";
import { ITask } from "src/app/product/models/task";

export const addTask = createAction(
    '[TASK] add',
    props<ITask>()
);

export const changeTask = createAction(
    '[TASK] change',
    props<{id: number, status: string}>()
);

export const changePerformers = createAction(
    '[TASK] changePerformers',
    props<{id: number, performers: string[]}>()
);