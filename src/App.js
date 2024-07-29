import React, { useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
import "./App.css";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    // Load tasks from localStorage
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    const storedCompletedTodos = JSON.parse(localStorage.getItem('completedTodos'));
    if (storedTodos) setTodos(storedTodos);
    if (storedCompletedTodos) setCompletedTodos(storedCompletedTodos);
  }, []);

  useEffect(() => {
    // Save tasks to localStorage
    localStorage.setItem('todos', JSON.stringify(allTodos));
    localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
  }, [allTodos, completedTodos]);

  const handleAddTodo = () => {
    if (newTitle.trim() === "" || newDescription.trim() === "") {
      return; // Prevent adding todos with empty title or description
    }

    let newTodoItem = {
      title: newTitle,
      description: newDescription
    };

    setTodos([...allTodos, newTodoItem]);
    setNewTitle(""); // Clear the input fields after adding
    setNewDescription("");
  };

  const handleDeleteTodo = (index) => {
    setTodos(allTodos.filter((_, i) => i !== index));
  };

  const handleCompleteTodo = (index) => {
    const completedItem = allTodos[index];
    setCompletedTodos([...completedTodos, completedItem]);
    handleDeleteTodo(index);
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
            <button type="button" onClick={handleAddTodo} className="primarybtn">
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondarybtn ${!isCompleteScreen ? 'active' : ''}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondarybtn ${isCompleteScreen ? 'active' : ''}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>
        <div className="Todo-list">
          {!isCompleteScreen ? (
            allTodos.map((todoItem, index) => (
              <div key={index} className="Todo-list-item">
                <div className="Todo-content">
                  <h3>{todoItem.title}</h3>
                  <p>{todoItem.description}</p>
                </div>
                <div className="icon-container">
                  <MdDelete className='delete-icon' onClick={() => handleDeleteTodo(index)} />
                  <CiCircleCheck className='check-icon' onClick={() => handleCompleteTodo(index)} />
                </div>
              </div>
            ))
          ) : (
            completedTodos.map((todoItem, index) => (
              <div key={index} className="Todo-list-item">
                <div className="Todo-content">
                  <h3>{todoItem.title}</h3>
                  <p>{todoItem.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
