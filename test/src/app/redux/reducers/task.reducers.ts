import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { ITask, ITasks } from "../../product/models/task";
import * as taskActions from "../actions/task.actions";

export const initialState: ITasks = {
    tasks: [],
    counter: 0
};

export const taskReducer: ActionReducer<ITasks, Action> = createReducer(
    initialState,
    on(taskActions.addTask, (state: ITasks, payload) =>  {
        const copyOfPayload = {...payload};
        copyOfPayload.id = state.counter + 1;
        return {...state, tasks: [...state.tasks, copyOfPayload], counter: state.counter + 1}
    }),
    on(taskActions.changeTask, (state: ITasks, payload) => {
        const idx: number = state.tasks.findIndex(elem => elem.id === payload.id);
        const copyOfTasks: ITask[] = [...state.tasks];
        if (idx !== -1) {
            copyOfTasks[idx] = {
                ...copyOfTasks[idx],
                status: payload.status,
            };
            return {...state, tasks: copyOfTasks};
        } else {
            return {...state};
        }
    }),
    on(taskActions.changePerformers, (state: ITasks, payload) => {
        const idx: number = state.tasks.findIndex(elem => elem.id === payload.id);
        const copyOfTasks: ITask[] = [...state.tasks];
        if (idx !== -1) {
            copyOfTasks[idx] = {
                ...copyOfTasks[idx],
                performers: payload.performers,
            };
            return {...state, tasks: copyOfTasks};
        } else {
            return {...state};
        }
    }),
)