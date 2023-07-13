import React, { createContext } from "react";
import { nanoid } from "nanoid";
import { useLocalStorage } from "usehooks-ts";

interface TodoContextProps {
  todos: Todo[];
  addTodo: (text: string) => void;
  editTodo: (id: string, text: string) => void;
  deleteTodo: (id: string) => void;
  updateTodoStatus: (id: string) => void;
}

export interface Todo {
  id: string;
  text: string;
  status: "undone" | "completed";
}

export const TodoContext = createContext<TodoContextProps | undefined>(
  undefined
);

export const TodoProvider = (props: { children: React.ReactNode }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: nanoid(),
      text,
      status: "undone",
    };

    setTodos([...todos, newTodo]);
  };

  const editTodo = (id: string, text: string) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) return { ...todo, text };
        return todo;
      });
    });
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const updateTodoStatus = (id: string) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id)
          return {
            ...todo,
            status: todo.status === "undone" ? "completed" : "undone",
          };
        return todo;
      });
    });
  };

  const value: TodoContextProps = {
    todos,
    addTodo,
    editTodo,
    deleteTodo,
    updateTodoStatus,
  };

  return (
    <TodoContext.Provider value={value}>{props.children}</TodoContext.Provider>
  );
};
