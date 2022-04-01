import React, { useEffect, useState } from "react";
import Name from "./Components/Name";
import './App.css';

function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function App() {
  const [data, setData] = useState([]);
  const [todos, setTodos] = useState([]);

  const fetchData = () => {
    fetch("https://cat-fact.herokuapp.com/facts")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setData(data)
      })
  }

  useEffect(() => {
    fetchData()
  }, []);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="wrapper">
      <h1>Cat facts</h1>
      <h3><Name name="Lucijan" /></h3>
      
      <div className="catfacts">
        {data.length > 0 && (
        <ul>
          {data.map(data => (
            <li key={data.id}>{data.text} <p className="createdAt">Created at: {data.createdAt}</p></li>
          ))}
        </ul>
      )}
      </div>

      <h2>Todo List</h2>

      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
