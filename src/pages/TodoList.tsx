import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoList {
  [id: number]: Todo | undefined
}

const TodoList = () => {
  const [todoList, setTodos] = useState<TodoList>({});
  const [newTodo, setNewTodo] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;

    const newId: number = Date.now();
    todoList[newId] = {
      id: newId,
      text: newTodo.trim(),
      completed: false
    }

    setTodos(todoList);
    setNewTodo('');
  };

  const toggleTodo = (id: number) => {
    todoList[id]!.completed = !todoList[id]!.completed;
    setTodos(todoList);
  };

  const deleteTodo = (id: number) => {
    todoList[id] = undefined;
    setTodos(todoList);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Todo List</h1>

      <form onSubmit={addTodo} className="mb-6">
        <div className="flex">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 shadow appearance-none border rounded-l py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r"
          >
            Add
          </button>
        </div>
      </form>

      <ul className="space-y-2">
        {Object.values(todoList).map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="mr-3"
              />
              <span
                className={`${
                  todo.completed ? 'line-through text-gray-500' : ''
                }`}
              >
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {Object.values(todoList).length === 0 && (
        <p className="text-center text-gray-500 mt-4">No todos yet. Add one!</p>
      )}

      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold mb-2">What's happening here?</h2>
        <p className="text-sm">
          This example demonstrates:
        </p>
        <ul className="list-disc list-inside text-sm mt-2">
          <li>Form handling with controlled inputs</li>
          <li>Managing lists of items in state</li>
          <li>Updating state based on previous state</li>
          <li>Conditional rendering</li>
        </ul>
      </div>
    </div>
  );
};

export default TodoList; 