import TodoItem from "./TodoItem";

function TodoList({ todos, refresh }) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo._id}
          todo={todo}
          refresh={refresh}
        />
      ))}
    </ul>
  );
}

export default TodoList;