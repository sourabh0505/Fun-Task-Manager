import React, { useState } from "react";
import "./todoApp.css";

function TodoApp() {
  const TODO = "TODO";
  const DOING = "DOING";
  const DONE = "DONE";

  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [dragTodo, setDragTodo] = useState(null);
  const [updateItem, setUpdateItem] = useState(null);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (updateItem) {
        const updatedObj = {
            title: value, 
            status: updateItem.status,
            id: updateItem.id
        }
        let copyTask = [...tasks];
        let updatedList = copyTask.filter((item) => item.id !== updateItem.id);
        setTasks((prev) => [...updatedList, updatedObj]);
        setUpdateItem(null);
      } else {
        const obj = {
          title: value,
          status: TODO,
          id: Date.now(),
        };
        setTasks((prev) => [...prev, obj]);
      }
      setValue("");
    }
  };
  console.log(tasks);

  const handleDrag = (e, todo) => {
    setDragTodo(todo);
  };

  const handleDragAndDrop = (status) => {
    let copyTask = [...tasks];
    copyTask = copyTask.map((item) => {
      if (dragTodo.id === item.id) {
        item.status = status;
      }
      return item;
    });
    setTasks(copyTask);
    setDragTodo(null);
  };

  const handleOnDrop = (e) => {
    const status = e.target.getAttribute("data-status");
    if (status === TODO) {
      handleDragAndDrop(TODO);
    } else if (status === DOING) {
      handleDragAndDrop(DOING);
    } else if (status === DONE) {
      handleDragAndDrop(DONE);
    }
  };

  const handleDeleteTodo = (todo) => {
    let copyTask = [...tasks];
    copyTask = copyTask.filter((item) => item.id !== todo.id);
    setTasks(copyTask);
  };

  const handleEditTodo = (task) => {
    setValue(task.title);
    setUpdateItem(task);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="main-container">
      <h1 className="app-heading">Task Manager Application</h1>

      <input
        type="text"
        placeholder="Type your tasks here..."
        onChange={handleChange}
        value={value}
        onKeyDown={handleKeyDown}
      />

      <div className="board">
        <div
          className="todo"
          onDragOver={handleDragOver}
          onDrop={handleOnDrop}
          data-status={TODO}
        >
          <h2 className="todo-col">Todo</h2>
          {tasks.length > 0 &&
            tasks.map(
              (todo) =>
                todo.status === TODO && (
                  <div
                    className="task-item"
                    onDrag={(e) => handleDrag(e, todo)}
                    draggable
                    key={tasks.id}
                  >
                    {todo.title}
                    <div className="task-buttons">
                      <span
                        className="btn"
                        onClick={() => handleEditTodo(todo)}
                      >
                        ✏️
                      </span>
                      <span
                        className="btn"
                        onClick={() => handleDeleteTodo(todo)}
                      >
                        🗑️
                      </span>
                    </div>
                  </div>
                )
            )}
        </div>

        <div
          className="doing"
          onDragOver={handleDragOver}
          onDrop={handleOnDrop}
          data-status={DOING}
        >
          <h2 className="doing-col">Doing</h2>
          {tasks.length > 0 &&
            tasks.map(
              (doing) =>
                doing.status === DOING && (
                  <div
                    className="task-item"
                    onDrag={(e) => handleDrag(e, doing)}
                    key={tasks.id}
                    draggable
                  >
                    {doing.title}
                    <div className="task-buttons">
                      <span
                        className="btn"
                        onClick={() => handleEditTodo(doing)}
                      >
                        ✏️
                      </span>
                      <span
                        className="btn"
                        onClick={() => handleDeleteTodo(doing)}
                      >
                        🗑️
                      </span>
                    </div>
                  </div>
                )
            )}
        </div>

        <div
          className="done"
          onDragOver={handleDragOver}
          onDrop={handleOnDrop}
          data-status={DONE}
        >
          <h2 className="done-col">Done</h2>
          {tasks.length > 0 &&
            tasks.map(
              (done) =>
                done.status === DONE && (
                  <div
                    className="task-item"
                    onDrag={(e) => handleDrag(e, done)}
                    key={tasks.id}
                    draggable
                  >
                    {done.title}
                    <div className="task-buttons">
                      <span
                        className="btn"
                        onClick={() => handleEditTodo(done)}
                      >
                        ✏️
                      </span>
                      <span
                        className="btn"
                        onClick={() => handleDeleteTodo(done)}
                      >
                        🗑️
                      </span>
                    </div>
                  </div>
                )
            )}
        </div>
      </div>
    </div>
  );
}

export default TodoApp;
