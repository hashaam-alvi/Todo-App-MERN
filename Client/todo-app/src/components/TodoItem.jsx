import {BASE_URL} from "./config"
import axios  from "axios";

export default function TodoItem({ todo, refresh, openEditModal }) {
  const deleteTodo = async () => {
    // await fetch(`${BASE_URL}/todos/${todo._id}`, {
    //   method: "DELETE",
    // });
    await axios.delete(`${BASE_URL}/todos/${todo._id}`);
    refresh();
  };

  const toggle = async () => {
    // await fetch(`${BASE_URL}/todos/${todo._id}/toggle`, {
    //   method: "PATCH",
    // });
    await axios.patch(`${BASE_URL}/todos/${todo._id}/toggle`);
    refresh();
  };

  return (
    <li className="TodoListLi">
      <div className="TodoListItems">
        <span className={`todo-text ${todo.completed ? "completed" : ""}`} >{todo.content}</span>
        <div className="TodoItembutton">
          <button className="doneBtn" disabled={todo.completed}  onClick={toggle}>
            Done
          </button>
          <button className="editBtn" disabled={todo.completed}  onClick={() => openEditModal(todo)}>
            Edit
          </button>
          <button className="delBtn" onClick={deleteTodo}>
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
