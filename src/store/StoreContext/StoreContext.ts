import React from "react";

export type Todo = {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

export type DispatchType = "ADD_TODO" | "TOGGLE_TODO" | "DELETE_TODO";

export type DispatchPayload = {
    ADD_TODO: {
        title: string;
        description: string;
    };
    TOGGLE_TODO: {
        id: number;
    };
    DELETE_TODO: {
        id: number;
    };
};

export type DispatchT = {
    [K in DispatchType]: {
        type: K;
        payload: DispatchPayload[K];
    }
}[DispatchType];
//Tirar o tipo de payload do dispatch, e deixar ele como um objeto genérico, 
// para que possa ser usado em qualquer tipo de ação. O tipo de ação vai ser definido pelo type, 
// e o payload vai ser um objeto genérico, que pode conter qualquer tipo de dado, dependendo da ação. 
// O reducer vai ser responsável por interpretar o tipo de ação e o payload, e atualizar o estado global de acordo com a ação.

export type TodosState = {
    todos: Todo[];
}



export type StoreContextType = {
    state: TodosState;
    dispatch: React.Dispatch<DispatchT>;
} 

export const STORAGE_KEY = "todo-list:todos";

const fallbackInitialTodosState: TodosState = {
    todos: [
        {
            id: 1,
            title: "Exemplo de Tarefa",
            description: "Esta é uma tarefa de exemplo para demonstrar o funcionamento do aplicativo.",
            completed: false
        },
        {
            id: 2,
            title: "Tarefa Concluída",
            description: "Esta tarefa já foi concluída para mostrar o estado de conclusão.",
            completed: true
        }
    ],
};

export const getInitialTodosState = (): TodosState => {
    if (typeof window === "undefined") return fallbackInitialTodosState;

    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return fallbackInitialTodosState;

        const parsed = JSON.parse(saved) as TodosState;
        if (!parsed || !Array.isArray(parsed.todos)) return fallbackInitialTodosState;

        return parsed;
    } catch {
        return fallbackInitialTodosState;
    }
};

export const initialStoreContext: StoreContextType = {
    state: getInitialTodosState(),
    dispatch: () => {},
}


export const StoreContext = React.createContext<StoreContextType>(initialStoreContext);
    



