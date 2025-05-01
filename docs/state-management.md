# State Management in React

## Table of Contents
1. [Introduction](#introduction)
2. [Local State](#local-state)
3. [Context API](#context-api)
4. [State Management Libraries](#state-management-libraries)
5. [Best Practices](#best-practices)

## Introduction

State management is a crucial aspect of React applications. It determines how data flows through your application and how components communicate with each other. React provides several ways to manage state, from simple local state to more complex global state management solutions.

## Local State

Local state is managed within a single component using the `useState` hook.

```tsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### When to Use Local State
- Data that's only needed within a single component
- UI state (e.g., form inputs, toggles)
- Temporary values that don't need to persist

## Context API

The Context API is React's built-in solution for sharing state between components without prop drilling.

```tsx
// Create a context
const ThemeContext = React.createContext('light');

// Provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Consumer component
function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      style={{ background: theme === 'light' ? 'white' : 'black' }}
    >
      Toggle Theme
    </button>
  );
}
```

### When to Use Context
- Theme settings
- User authentication
- Language preferences
- Any data that needs to be accessed by many components at different nesting levels

## State Management Libraries

### Redux
Redux is a predictable state container for JavaScript apps.

```tsx
// Action
const increment = () => ({
  type: 'INCREMENT'
});

// Reducer
function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    default:
      return state;
  }
}

// Store
const store = createStore(counter);

// Component
function Counter() {
  const count = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
    </div>
  );
}
```

### Zustand
Zustand is a small, fast, and scalable state management solution.

```tsx
import create from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

function Counter() {
  const { count, increment, decrement } = useStore();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}
```

## Best Practices

1. **Start with Local State**
   - Begin with local state and only move to more complex solutions when needed
   - Keep state as close as possible to where it's used

2. **Use Context Wisely**
   - Don't use Context for state that changes frequently
   - Split contexts by domain (e.g., AuthContext, ThemeContext)

3. **Consider State Management Libraries When**
   - You have complex state logic
   - You need to share state between many components
   - You need to track state changes for debugging
   - You need to implement undo/redo functionality

4. **State Structure**
   - Keep state normalized
   - Avoid deeply nested state
   - Use immutable updates

5. **Performance Considerations**
   - Use `useMemo` and `useCallback` for expensive calculations
   - Implement proper memoization
   - Consider using `React.memo` for pure components

## Choosing the Right Solution

1. **Local State**
   - ✅ Simple, self-contained components
   - ✅ Form inputs and UI state
   - ❌ Shared state between components

2. **Context API**
   - ✅ Theme and user preferences
   - ✅ Authentication state
   - ❌ High-frequency updates

3. **Redux/Zustand**
   - ✅ Complex state logic
   - ✅ Shared state between many components
   - ✅ Need for time-travel debugging
   - ❌ Simple applications with minimal state

## Example: Todo App State Management

```tsx
// Using Context API
const TodoContext = React.createContext();

function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

// Using Zustand
const useTodoStore = create((set) => ({
  todos: [],
  addTodo: (text) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), text, completed: false }],
    })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
}));
``` 