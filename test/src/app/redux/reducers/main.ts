import { ActionReducerMap } from "@ngrx/store";
import { ITasks } from "src/app/product/models/task";
import { taskReducer } from "./task.reducers";

export interface State {
    tasks: ITasks;
}

export const reducers: ActionReducerMap<State> = {
    tasks: taskReducer,
};