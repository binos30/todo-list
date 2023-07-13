import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

import { useTodo } from "../context";
import { Input } from "./Input";

export const AddTodo = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState<string>("");
  const { addTodo } = useTodo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() !== "") {
      addTodo(input);
      setInput("");
      toast.success("Todo added successfully!");
    } else {
      toast.error("Todo field cannot be empty!");
    }
  };

  useEffect(() => {
    // Check if input ref exists then automatically focus on input field when component is mounted
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center w-full max-w-lg gap-2 p-5 m-auto">
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Add todo ..."
        />
        <button
          type="submit"
          className="px-5 py-2 text-sm font-normal text-green-300 bg-green-900 border-2 border-green-900 active:scale-95 rounded-xl"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
