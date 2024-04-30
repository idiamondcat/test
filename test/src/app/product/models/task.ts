export interface ITasks {
    tasks: ITask[];
    counter: number;
}
export interface ITask {
    id: number | null;
    title: string | null;
    name: string | null;
    deadline: string | null;
    priority: string | null;
    status: string | null;
    performers: (string | null)[];
}