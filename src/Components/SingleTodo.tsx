import React, { useState, useRef, useEffect } from "react";
import { Todo } from "../model";

const SingleTodo: React.FC<{
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}> = ({ todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>(todo.todo);

  // const handleEdit = (e: React.FormEvent, id: number) => {
  //   e.preventDefault();
  //   setTodos(
  //     todos.map((el) => (el.id === id ? { ...todo, todo: editValue } : todo))
  //   );
  //   setEdit(false);
  // };

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, todo: editValue } : todo
      )
    );
    setEdit(false);
  };

  const handleDelete = () => {
    const newArr: Todo[] = todos.filter((el) => el.id !== todo.id);
    setTodos(newArr);
  };
  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };
  return (
    <form
      className="todos__single"
      onSubmit={(e: React.FormEvent) => handleEdit(e, todo.id)}
    >
      {edit ? (
        <input
          value={editValue}
          type="text"
          onChange={(e) => setEditValue(e.target.value)}
          className="todos__single--text"
        />
      ) : todo.isDone ? (
        <s className="todos__single--text">{todo.todo}</s>
      ) : (
        <span className="todos__single--text">{todo.todo}</span>
      )}
      <div>
        <span
          className="icon"
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          Edit
        </span>
        <span className="icon" onClick={handleDelete}>
          Delete
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          Done
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
