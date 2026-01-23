import * as z from "zod";

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TaskState {
    todos: Todo[];
    length: number;
    completed: number;
    pending: number;
}

type TaskAction =
    | { type: 'ADD_TODO', payload: string }
    | { type: 'TOGGLE_TODO', payload: number }
    | { type: 'DELETE_TODO', payload: number };

const TaskSchema = z.object({
    id: z.number(),
    text: z.string(),
    completed: z.boolean(),
});

const TaskStateSchema = z.object({
    todos: z.array(TaskSchema),
    length: z.number(),
    completed: z.number(),
    pending: z.number(),
});

export const getTasksInitialState = (): TaskState => {
    const initialState = {
        todos: [],
        length: 0,
        completed: 0,
        pending: 0,
    };
    
    const localStorageState = localStorage.getItem('tasks-state');
    if (!localStorageState) {
        return initialState;
    }

    const result = TaskStateSchema.safeParse(JSON.parse(localStorageState));
    if (result.error) {
        return initialState;
    }

    return result.data;
}

export const tasksReducer = (state: TaskState, action: TaskAction): TaskState => {
    switch (action.type) {
        case 'ADD_TODO': {
            const newTodo: Todo = {
                id: Date.now(),
                text: action.payload,
                completed: false,
            };
            const updatedTodos = [...state.todos, newTodo];

            return {
                ...state,
                todos: updatedTodos,
                length: updatedTodos.length,
                pending: updatedTodos.filter((todo) => todo.completed === false).length,
            };
        }

        case 'DELETE_TODO': {
            const updatedTodos = state.todos.filter((todo) => todo.id !== action.payload);
            const completedTodos = updatedTodos.filter((todo) => todo.completed === true).length;
            const pendingTodos = updatedTodos.length - completedTodos;

            return {
                ...state,
                todos: updatedTodos,
                length: updatedTodos.length,
                completed: completedTodos,
                pending: pendingTodos,
            };
        }

        case 'TOGGLE_TODO': {
            const updatedTodos = state.todos.map(
                (todo) => (todo.id === action.payload)
                    ? { ...todo, completed: !todo.completed }
                    : todo
            );
            const completedTodos = updatedTodos.filter((todo) => todo.completed === true).length;
            const pendingTodos = updatedTodos.length - completedTodos;

            return {
                ...state,
                todos: updatedTodos,
                completed: completedTodos,
                pending: pendingTodos,
            };
        }

        default:
            return state;
    }
}
