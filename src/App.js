import { MdDelete } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todolist")) || [];
    const savedCompletedTodos = JSON.parse(localStorage.getItem("completedTodos")) || [];
    setTodos(savedTodos);
    setCompletedTodos(savedCompletedTodos);
  }, []);

  const handleAddTodo = () => {
    if (newTitle.trim() === "" || newDescription.trim() === "") {
      return; // Prevent adding todos with empty title or description
    }
    // Creates a new todo object
    const newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    const updatedTodos = [...allTodos, newTodoItem];
    setTodos(updatedTodos);
    localStorage.setItem("todolist", JSON.stringify(updatedTodos));
    setNewTitle(""); // Clear the input fields after adding
    setNewDescription("");
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...allTodos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    localStorage.setItem("todolist", JSON.stringify(newTodos));
  };

  const handleCompleteTodo = (index) => {
    const completedItem = allTodos[index];
    const updatedCompletedTodos = [...completedTodos, completedItem];
    setCompletedTodos(updatedCompletedTodos);
    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedTodos));

    handleDeleteTodo(index); // Also delete from active todos
  };

  return (
    <div className="App">
      <h1>My Todo List</h1>
      <div className="todo_wrapper">
        <div className="Todo-input">
          <div className="Todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Write your todo task"
            />
          </div>
          <div className="Todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Describe your task"
            />
          </div>
          <div className="Todo-input-item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primarybtn"
            >
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondarybtn ${!isCompleteScreen ? "active" : ""}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondarybtn ${isCompleteScreen ? "active" : ""}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>
        <div className="Todo-list">
          {!isCompleteScreen
            ? allTodos.map((todoItem, index) => (
                <div key={index} className="Todo-list-item">
                  <div className="Todo-content">
                    <h3>{todoItem.title}</h3>
                    <p>{todoItem.description}</p>
                  </div>
                  <div className="icon-container">
                    <MdDelete
                      className="delete-icon"
                      onClick={() => handleDeleteTodo(index)}
                    />
                    <CiCircleCheck
                      className="check-icon"
                      onClick={() => handleCompleteTodo(index)}
                    />
                  </div>
                </div>
              ))
            : completedTodos.map((todoItem, index) => (
                <div key={index} className="Todo-list-item">
                  <div className="Todo-content">
                    <h3>{todoItem.title}</h3>
                    <p>{todoItem.description}</p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default App;
