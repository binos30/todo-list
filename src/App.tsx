import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { AddTodo, TodoList } from "./components";

const App = () => {
  useEffect(() => {
    const date = new Date();
    const yearElement = document.getElementById("current-year");
    yearElement && (yearElement.innerHTML = date.getFullYear().toString());
  }, []);

  return (
    <div>
      <Toaster position="bottom-center" />
      <AddTodo />
      <TodoList />
    </div>
  );
};

export default App;
