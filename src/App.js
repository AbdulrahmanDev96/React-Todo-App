import {React, useState} from "react";
import TodoForm from "./components/TodoForm";
import Todo from "./components/Todo";
import "./App.css";

const App = () => {
  let [todos, setTodos] = useState([]);
  const [todoToShow, setTodoShow] = useState("all");
  const [toggleAllComplete, setToggleAllComplete] = useState(true);
  const addTodo = (todo) => {
    setTodos([todo, ...todos]);
  };
  const handelDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodoToShow = (s) => {
    setTodoShow(s);
  };

  const removeAllTodosThatAreComplete = () => {
    setTodos(todos.filter((todo) => !todo.complete));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            complete: !todo.complete,
          };
        } else {
          return todo;
        }
      })
    );
  };

  if (todoToShow === "active") {
    todos = todos.filter((todo) => !todo.complete);
  } else if (todoToShow === "complete") {
    todos = todos.filter((todo) => todo.complete);
  }

  return (
    <div className="container">
      <TodoForm onSubmit={addTodo} />
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          onDelete={() => handelDelete(todo.id)}
          toggleComplete={() => toggleComplete(todo.id)}
        />
      ))}
      <div>
        <button
          className="update-btn btn"
          onClick={() => updateTodoToShow("all")}>
          All
        </button>
        <button
          className="update-btn btn"
          onClick={() => updateTodoToShow("active")}>
          Active
        </button>
        <button
          className="update-btn btn"
          onClick={() => updateTodoToShow("complete")}>
          Complete
        </button>
      </div>
      {todos.some((todo) => todo.complete) ? (
        <button className="all-btn btn" onClick={removeAllTodosThatAreComplete}>
          Remove all complete todos
        </button>
      ) : null}
      <button
        className="all-btn btn"
        onClick={() => {
          setTodos(
            todos.map((todo) => ({
              ...todo,
              complete: toggleAllComplete,
            }))
          );
          setToggleAllComplete(!toggleAllComplete);
        }}>
        Toggle all complete:{`${toggleAllComplete}`}
      </button>
    </div>
  );
};

export default App;
